<template>
  <div>
    <div class="table-operations">
      <a-alert
        v-if="this.dataSource.length >= 1"

        message="Cảnh cáo"
        description="Bài viết của bạn có lỗi.Vui lòng kiểm tra ở hộp thư"
        type="warning"
        style="margin-bottom: 10px"
        show-icon
      />
      <table-operations :getCountArticle="getCountArticle"/>
    </div>
    <a-table bordered :data-source="dataSource" :columns="columns" :pagination="{ pageSize:5}" :scroll="{ x: 1000 }"
             @change="onChange" :rowKey="(record,index)=>{return index}">
      <div
        slot="filterDropdown"
        slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
        style="padding: 8px"
      >
        <a-input
          name="search"
          v-ant-ref="c => (searchInput = c)"
          :placeholder="`Search ${column.dataIndex}`"
          :value="selectedKeys[0]"
          style="width: 188px; margin-bottom: 8px; display: block;"
          @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
          @pressEnter="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
        />
        <a-button
          type="primary"
          icon="search"
          size="small"
          style="width: 90px; margin-right: 8px"
          @click="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
        >
          Tìm kiếm
        </a-button>
        <a-button size="small" style="width: 90px" @click="() => handleReset(clearFilters)">
          Xóa
        </a-button>
      </div>
      <a-icon
        slot="filterIcon"
        slot-scope="filtered"
        type="search"
        :style="{ color: filtered ? '#108ee9' : undefined }"
      />
      <template slot="customRender" slot-scope="text, record, index, column">
      <span v-if="searchText && searchedColumn === column.dataIndex">
        <template
          v-for="(fragment, i) in text
            .toString()
            .split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))"
        >
          <mark
            v-if="fragment.toLowerCase() === searchText.toLowerCase()"
            :key="i"
            class="highlight"
          >{{ fragment }}</mark
          >
          <template v-else>{{ fragment }}</template>
        </template>
      </span>
        <template v-else>
          {{ text }}
        </template>
      </template>

      <template slot="content" slot-scope="text, record">
        <span v-html="text"></span>
      </template>
      <template slot="operation" slot-scope="text, record">
        <a-popconfirm
          v-if="dataSource.length"
          title="Bạn có muốn xóa bài viết？"
          @confirm="() => onDelete(record.key)"
        >
          <a href="javascript:;"><a-icon type="delete" /> | </a>
        </a-popconfirm>
        <a-popconfirm
          v-if="dataSource.length"
          title="Bạn có muốn sửa bài viết？"
          @confirm="() => onEdit(record.key)"
        >
          <a href="javascript:;"><a-icon type="edit" /> | </a>
        </a-popconfirm>
        <a-popconfirm
          v-if="dataSource.length"
          title="Bạn có muốn xem bài viết？"
          @confirm="() => showDrawer(record.key)"
        >
          <a href="javascript:;"><a-icon type="eye" /></a>
        </a-popconfirm>
      </template>
    </a-table>
    <a-drawer  v-if="display ==='view'" placement="right" :closable="false" :visible="visible" @close="onClose">
      <drawer-content :content="content" :title="title"/>
    </a-drawer>
    <a-drawer  v-if="display ==='edit'" placement="right" :closable="false" :visible="visible" @close="onClose">
      <drawer-article :content="content" :id="id" :title="title" :categories="categories" :image="image"/>
    </a-drawer>
  </div>
</template>
<script>
import {mapState, mapActions} from 'vuex';
import {notication_error, notication_success,getLoadIcon} from "@/helpers/notication";

export default {
  layout: 'admin',
  head() {
    return {
      title: `${this.headName} | ${this.$siteConfig.siteName}`
    }
  },
  data() {
    return {
      visible: false,
      title:'',
      display:'',
      headName:'保守中',
      content:'',
      searchText: '',
      dataSource: [
        {}
      ],
      columns: [
        {
          title: '番号',
          dataIndex: 'stt',
          width: 60,
          fixed: 'left'
        },
        {
          title: 'タイトル',
          dataIndex: 'name',
          width: 300,
          fixed: 'left',
          sorter: (a, b) => a.name.length - b.name.length,
          sortDirections: ['descend', 'ascend'],
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender',
          },
          onFilter: (value, record) =>
            record.name
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: visible => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus();
              }, 0);
            }
          },
        },
        {
          title: '内容',
          dataIndex: 'content',
          width: 400,
          sorter: (a, b) => a.content.length - b.content.length,
          sortDirections: ['descend', 'ascend'],
          scopedSlots: {
            customRender: 'content',
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
          },
          onFilter: (value, record) =>
            record.content
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: visible => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus();
              });
            }
          },
        },
        {
          title: 'カテゴリ',
          dataIndex: 'categories',
          width: 150,
          sorter: (a, b) => a.categories.length - b.categories.length,
          sortDirections: ['descend', 'ascend'],
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender',
          },
          onFilter: (value, record) =>
            record.categories
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: visible => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus();
              });
            }
          },
        },
        {
          title: 'コメント',
          dataIndex: 'comment',
          width: 150,
          defaultSortOrder: 'descend',
          sorter: (a, b) => a.comment - b.comment,
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender',
          },
          onFilter: (value, record) =>
            record.comment
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: visible => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus();
              }, 0);
            }
          },
        },
        {
          title: 'ビュー',
          dataIndex: 'view',
          width: 130,
          defaultSortOrder: 'descend',
          sorter: (a, b) => a.view - b.view,
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender',
          },
          onFilter: (value, record) =>
            record.view
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: visible => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus();
              });
            }
          },
        },
        {
          title: '設定',
          dataIndex: 'operation',
          fixed: 'right',
          width: 100,
          scopedSlots: {customRender: 'operation'},
        },
      ],
    };
  },
  async asyncData({params, store}) {
    const currentUser = store.state.author.currentUser;
    if (!currentUser) {
      return;
    }
    const id = currentUser.id;

    await store.dispatch('posts/actArticlesPendingByUser', {
      author: id,
    });
  },
  methods: {
    showDrawer(key) {
      if(this.dataSource){
        this.visible = true;
        this.display = 'view';
        this.headName = 'ビュー';
        this.dataSource.map((obj, index) => {
          if (obj.key === key) {
            this.title   = obj.name
            this.content = obj.full
          }
        });
      }
    },
    onClose() {
      this.visible = false;
      this.headName = '保守中';
    },
    handlePending() {
      return this.$router.push('/dashboard/pending-article');
    },
    handleAdd() {
      return this.$router.push('/dashboard/article');
    },
    ...mapActions({
      deletePost: 'author/actDeletePost',
    }),
    onChange(pagination, filters, sorter) {
    },
    onDelete(key) {
      this.deletePost(key)
        .then(res => {
          if (res.ok) {
            // Thanh cong
            notication_success(this, '投稿が正常に削除されました')
            const dataSource = [...this.dataSource];
            this.dataSource = dataSource.filter(item => item.key !== key);
          } else {
            notication_error(this, res.error);
          }
        })
    },
    onEdit(key) {
      if(this.dataSource){
        this.visible  = true;
        this.display  = 'edit';
        this.headName = '編集';
        this.dataSource.map((obj, index) => {
          if (obj.key === key) {
            this.title      = obj.name
            this.content    = obj.full
            this.categories = obj.categories
            this.image      = obj.image
            this.id         = obj.key
          }
        });
      }
    },
    handleSearch(selectedKeys, confirm, dataIndex) {
      confirm();
      this.searchText = selectedKeys[0];
      this.searchedColumn = dataIndex;
    },
    handleReset(clearFilters) {
      clearFilters();
      this.searchText = '';
    },
  },
  mounted() {
    const {post} = this;
    if (post) {
      this.dataSource = post.map((obj, index) => {
        if (obj.title && obj.content) {
          const subContent  =  obj.content.rendered.length > 100 ?  obj.content.rendered.substring(0,100)+' ...':  obj.content.rendered;
          return {
            ['stt']: index + 1,
            ['key']: obj.id,
            ['comment']: obj.comment_count + ' 回',
            ['name']: obj.title.rendered,
            ['view']: obj.view_count+ ' 回',
            ['categories']: obj.categories,
            ['content']   : subContent,
            ['image']     : obj.featured_media_url,
            ['full']      : obj.content.rendered,
          }
        }else{
          return {
            ['stt']: index + 1,
            ['key']: 1,
            ['comment']: this.$siteConfig.userEmpty,
            ['name']: this.$siteConfig.userEmpty,
            ['view']: this.$siteConfig.userEmpty,
            ['categories']: this.$siteConfig.userEmpty,
            ['content']: this.$siteConfig.userEmpty,
          }
        }
      });
    }
  },
  computed: {
    ...mapState({
      post: state => state.posts.pendingPosts
    }),
    getCountArticle(){
      if(this.dataSource.length >= 1 ){
        return this.dataSource.length
      }else{
        return 0
      }
    }
  }
};
</script>

<style>
.ant-drawer-content-wrapper{
  width: 80% !important;
}
@media screen and (max-width: 575px) {
  .ant-drawer-content-wrapper {
    width: 90% !important;
  }
}
@media all and (device-width: 768px) and (device-height: 1024px) and (orientation:portrait) {
  .ant-drawer-content-wrapper {
    width: 80%  !important;
  }
}
@media all and (device-width: 1024px) and (device-height: 768px) and (orientation:landscape) {
  .ant-drawer-content-wrapper {
    width: 80%  !important;
  }
}
.highlight {
  background-color: rgb(255, 192, 105);
  padding: 0px;
}
.ant-popover-inner-content {
  display: block;
  font-family: monospace;
  white-space: pre;
}
.editable-cell:hover .editable-cell-icon {
  display: inline-block;
}
.editable-cell-icon:hover,
.editable-cell-icon-check:hover {
  color: #108ee9;
}
.table-operations {
  margin-bottom: 16px;
}
.table-operations > button {
  margin-right: 8px;
}
</style>
