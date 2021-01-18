<template>
  <div>
    <textarea :id="id">{{ content }}</textarea>
  </div>
</template>

<script>
import {mapActions} from 'vuex';

let tinymce = null;
let langs = null;
let theme = null;
let advlist = null;
let wordcount = null;
let autolink = null;
let autosave = null;
let charmap = null;
// let codesample = null;
let emoticons = null;
let fullscreen = null;
let hr = null;
let imagetools = null;
let insertdatetime = null;
let link = null;
let media = null;
let noneditable = null;
let paste = null;
let print = null;
let searchreplace = null;
let template = null;
let textpattern = null;
let visualblocks = null;
let anchor = null;
let autoresize = null;
let bbcode = null;
let code = null;
let colorpicker = null;
let directionality = null;
let fullpage = null;
let help = null;
let image = null;
let importcss = null;
let contextmenu = null;
let legacyoutput = null;
let lists = null;
let nonbreaking = null;
let pagebreak = null;
let preview = null;
let save = null;
let spellchecker = null;
let table = null;
let textcolor = null;
let toc = null;
let visualchars = null;
let lightgray = null;
if (process.client) {
  tinymce = require('tinymce/tinymce');
  langs = require('tinymce-i18n/langs/ja.js');
  theme = require('tinymce/themes/modern/theme');
  advlist = require('tinymce/plugins/advlist');
  wordcount = require('tinymce/plugins/wordcount');
  autolink = require('tinymce/plugins/autolink');
  autosave = require('tinymce/plugins/autosave');
  charmap = require('tinymce/plugins/charmap');
  contextmenu = require('tinymce/plugins/contextmenu');
  // codesample = require('tinymce/plugins/codesample');
  emoticons = require('tinymce/plugins/emoticons');
  fullscreen = require('tinymce/plugins/fullscreen');
  hr = require('tinymce/plugins/hr');
  imagetools = require('tinymce/plugins/imagetools');
  insertdatetime = require('tinymce/plugins/insertdatetime');
  link = require('tinymce/plugins/link');
  media = require('tinymce/plugins/media');
  noneditable = require('tinymce/plugins/noneditable');
  paste = require('tinymce/plugins/paste');
  print = require('tinymce/plugins/print');
  searchreplace = require('tinymce/plugins/searchreplace');
  template = require('tinymce/plugins/template');
  textpattern = require('tinymce/plugins/textpattern');
  visualblocks = require('tinymce/plugins/visualblocks');
  anchor = require('tinymce/plugins/anchor');
  autoresize = require('tinymce/plugins/autoresize');
  bbcode = require('tinymce/plugins/bbcode');
  code = require('tinymce/plugins/code');
  colorpicker = require('tinymce/plugins/colorpicker');
  directionality = require('tinymce/plugins/directionality');
  fullpage = require('tinymce/plugins/fullpage');
  help = require('tinymce/plugins/help');
  image = require('tinymce/plugins/image');
  importcss = require('tinymce/plugins/importcss');
  legacyoutput = require('tinymce/plugins/legacyoutput');
  lists = require('tinymce/plugins/lists');
  nonbreaking = require('tinymce/plugins/nonbreaking');
  pagebreak = require('tinymce/plugins/pagebreak');
  preview = require('tinymce/plugins/preview');
  save = require('tinymce/plugins/save');
  spellchecker = require('tinymce/plugins/spellchecker');
  table = require('tinymce/plugins/table');
  textcolor = require('tinymce/plugins/textcolor');
  toc = require('tinymce/plugins/toc');
  visualchars = require('tinymce/plugins/visualchars');
  lightgray = require('tinymce/skins/lightgray/skin.min.css');
}

// Any plugins you want to use has to be imported

export default {
  name: "TinymceVue",
  watchQuery: true,
  props: {
    id: {
      type: String,
      required: true
    },
    htmlClass: {default: '', type: String},
    value: {default: ''},
    plugins: {
      default: function () {
        return [
          'advlist autolink lists link image charmap print preview hr anchor pagebreak',
          'searchreplace wordcount visualblocks visualchars code fullscreen',
          'insertdatetime media nonbreaking save table contextmenu directionality',
          'template paste textcolor colorpicker textpattern imagetools toc help emoticons hr'
        ];
      }, type: Array
    },
    toolbar1: {
      default: 'formatselect | bold italic  strikethrough  forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat',
      type: String
    },
    toolbar2: {default: '', type: String},
    other_options: {
      default: function () {
        return {
          height: "400",
          width: "auto",
          language: 'ja',
          image_title: true,
          /* enable automatic uploads of images represented by blob or data URIs*/
          automatic_uploads: true,
          /*
            URL of our upload handler (for more details check: https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_url)
            images_upload_url: 'postAcceptor.php',
            here we add custom filepicker only to Image dialog
          */
          file_picker_types: 'image',
          relative_urls : false,
          remove_script_host : false,
          convert_urls : true,
          /* and here's our custom image picker*/
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        };
      }, type: Object
    },
    readonly: {default: false, type: Boolean}
  },
  data() {
    return {
      fileImg: '',
      content: '',
      editor: null,
      cTinyMce: null,
      checkerTimeout: null,
      isTyping: false,
    };
  },
  mounted() {
    this.content = this.value;
    setTimeout(() => {
      this.init();
    }, 500)

  },
  beforeDestroy() {
    this.editor.destroy();
  },
  watch: {
    value: function (newValue) {
      if (!this.isTyping) {
        if (this.editor !== null)
          this.editor.setContent(newValue);
        else
          this.content = newValue;
      }
    },
    readonly(value) {
      if (value) {
        this.editor.setMode('readonly');
      } else {
        this.editor.setMode('design');
      }
    }
  },
  methods: {
    ...mapActions({
      actUploadAvatar: 'author/actUploadAvatar'
    }),
    init() {
      let options = {
        selector: '#' + this.id,
        skin: false,
        toolbar1: this.toolbar1,
        toolbar2: this.toolbar2,
        images_upload_url: '/blogs/upload.php',
        plugins: this.plugins,
        init_instance_callback: this.initEditor,
        images_upload_handle: function (blobInfo, success, failure, progress) {
          var xhr, formData;

          xhr = new XMLHttpRequest();
          xhr.withCredentials = false;
          xhr.open('POST', '/blogs/upload.php');

          xhr.onload = function () {
            var json;

            if (xhr.status != 200) {
              failure('HTTP Error: ' + xhr.status);
              return;
            }

            json = JSON.parse(xhr.responseText);

            if (!json || typeof json.location != 'string') {
              failure('Invalid JSON: ' + xhr.responseText);
              return;
            }

            success(json.location);
          }
          formData = new FormData();
          formData.append('file', blobInfo.blob(), blobInfo.filename());

          xhr.send(formData);

        }

      }
      tinymce.init(this.concatAssciativeArrays(options, this.other_options));

    },
    initEditor(editor) {
      this.editor = editor;
      editor.on('KeyUp', (e) => {
        this.submitNewContent();
      });
      editor.on('Change', (e) => {
        if (this.editor.getContent() !== this.value) {
          this.submitNewContent();
        }
        this.$emit('editorChange', e);
      });
      editor.on('init', (e) => {
        editor.setContent(this.content);
        this.$emit('input', this.content);
      });
      if (this.readonly) {
        this.editor.setMode('readonly');
      } else {
        this.editor.setMode('design');
      }

      this.$emit('editorInit', editor);
    },
    concatAssciativeArrays(array1, array2) {
      if (array2.length === 0) return array1;
      if (array1.length === 0) return array2;
      let dest = [];
      for (let key in array1) dest[key] = array1[key];
      for (let key in array2) dest[key] = array2[key];
      return dest;
    },
    submitNewContent() {
      this.isTyping = true;
      if (this.checkerTimeout !== null)
        clearTimeout(this.checkerTimeout);
      this.checkerTimeout = setTimeout(() => {
        this.isTyping = false;
      }, 300);

      this.$emit('input', this.editor.getContent());
    }
  }
}
</script>

<style scoped>

</style>
