<template>
  <div>
    <div class="table-operations">
      <table-operations :getCountArticle="getCountEmail" type="support"/>
    </div>
    <a-table bordered :data-source="dataSource" :columns="columns" :pagination="{ pageSize:10} " :scroll="{ x: 1300 }"
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
          title="Bạn có muốn xóa bài viết ？"
          @confirm="() => onDelete(record.key)"
        >
          <a href="javascript:;"><a-icon type="delete" /> | </a>
        </a-popconfirm>
        <a-popconfirm
          v-if="dataSource.length"
          title="Bạn có muốn xem bài viết ？"
          @confirm="() => showDrawer(record.key)"
        >
          <a href="javascript:;"><a-icon type="eye" /></a>
        </a-popconfirm>
      </template>
    </a-table>
    <a-drawer  placement="right" :closable="false" :visible="visible" @close="onClose">
      <drawer-content :content="content" :title="title" @close="onClose"/>
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
      headName:'Hộp thư',
      title:'',
      content:'',
      searchText: '',
      dataSource: [
        {}
      ],
      columns: [
        {
          title: 'STT',
          dataIndex: 'stt',
          fixed: 'left',
          width: 60,
        },
        {
          title: 'Tiêu đề',
          dataIndex: 'name',
          fixed: 'left',
          width: 300,
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
          title: 'Nội dung',
          dataIndex: 'content',
          width: 500,
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
          title: 'Thời gian',
          dataIndex: 'date',
          width: 150,
          sorter: (a, b) => a.date.length - b.date.length,
          sortDirections: ['descend', 'ascend'],
          scopedSlots: {
            customRender: 'date',
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
          },
          onFilter: (value, record) =>
            record.date
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
          title: 'Tùy chọn',
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
    await store.dispatch('posts/actArticlesDraftByUser', {
      author: id,
    });
  },
  methods: {
    showDrawer(key) {
      if(this.dataSource){
        this.headName = 'Xem bài viết';
        this.visible = true;
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
      this.headName = 'Hộp thư';
    },
    handleMailbox() {
      return this.$router.push('/dashboard/mailbox');
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
            notication_success(this, 'Bài viết đã xóa thành công')
            const dataSource = [...this.dataSource];
            this.dataSource = dataSource.filter(item => item.key !== key);
          } else {
            notication_error(this, res.error);
          }
        })
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
            ['stt']     : index + 1,
            ['key']     : obj.id,
            ['name']    : obj.title.rendered,
            ['content'] : subContent,
            ['full']    : obj.content.rendered,
            ['date']    : obj.post_date,
          }
        }else{
          return {
            ['stt']     : index + 1,
            ['key']     : 1,
            ['name']    : this.$siteConfig.userEmpty,
            ['content'] : this.$siteConfig.userEmpty,
            ['date']    : this.$siteConfig.userEmpty,
          }
        }
      });
    }
  },
  computed: {
    ...mapState({
      post: state => state.posts.draftPosts,
    }),
    getCountEmail(){
      if(this.dataSource.length >= 1 ){
        return this.dataSource.length
      }else{
        return 0
      }
    }
  }
};
</script>

<style scoped>
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
