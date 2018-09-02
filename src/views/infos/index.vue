<template>
  <div class="app-container">
    <div class="table-button-group">
      <!--刷新按钮-->
      <el-button
        :loading="reload"
        icon="el-icon-refresh"
        type="primary"
        @click="loadData()" />

      <el-button
        type="primary"
        icon="el-icon-plus"
        @click="handleClick('new')">
        添加
      </el-button>

      <el-button
        type="primary"
        icon="el-icon-menu"
        :disabled="single"
        @click="handleClick('update')">
        修改
      </el-button>

      <el-button
        type="primary"
        icon="el-icon-menu"
        :disabled="!multi"
        @click="handleClick('delete')">
        删除
      </el-button>

      <el-input
        v-model="search"
        style="width:20%;"
        placeholder="搜索"
        prefix-icon="el-icon-search" />
    </div>

    <el-table
      :data="list"
      v-loading="reload"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" />
      <el-table-column label="ID" prop="id"></el-table-column>
      <el-table-column label="名称" align="center" prop="name">
        <template slot-scope="scope"><el-tag :hit="true" :color="scope.row.color">{{scope.row.name}}</el-tag></template>
      </el-table-column>
      <el-table-column label="绑定资源数量" align="center" prop="createdAt"></el-table-column>
      <el-table-column label="创建时间" align="center" prop="createdAt"></el-table-column>
    </el-table>

    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="page.current"
        :page-sizes="[8, 20, 50]"
        :page-size="page.size"
        layout="total, sizes, prev, pager, next"
        :total="count">
      </el-pagination>
    </div>

    <el-dialog
      :visible.sync="tag.new_visible"
      title="创建标签"
      width="50%">
      <el-form ref="tag" :model="tag" status-icon label-width="100px">
        <el-form-item label="名字">
          <el-input v-model="tag.new_data.name" type="text" auto-complete="off" />
        </el-form-item>
        <el-form-item label="颜色">
          <el-input v-model="tag.new_data.color" type="text" auto-complete="off" />
          <el-color-picker v-model="tag.new_data.color" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClick('new-cancel')">取 消</el-button>
        <el-button type="primary" @click="handleClick('new-ok')">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      :visible.sync="tag.update_visible"
      title="更新标签"
      width="50%">
      <el-form ref="tag" :model="tag" status-icon label-width="100px">
        <el-form-item label="名字">
          <el-input v-model="tag.update_data.name" type="text" auto-complete="off" />
        </el-form-item>
        <el-form-item label="颜色">
          <el-input v-model="tag.update_data.color" type="text" auto-complete="off" />
          <el-color-picker v-model="tag.update_data.color" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClick('update-cancel')">取 消</el-button>
        <el-button type="primary" @click="handleClick('update-ok')">更 新</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { getTagList, createTag, updateTag, deleteTag } from '@/api/table'

export default {
  data() {
    return {
      reload: false,
      search: '',
      tag: {
        new_visible: false,
        new_data: {
          name: '',
          color: '#345623'
        },
        update_visible: false,
        update_data: {
          name: '',
          color: '',
          id: ''
        }
      },
      list: null,
      count: 0,
      selections: [],
      page: {
        current: 1,
        size: 8
      }
    }
  },
  created() {
    this.loadData()
  },
  computed: {
    single: function(){
      return this.selections.length != 1
    },
    multi: function(){
      return this.selections.length > 0
    }
  },
  methods: {
    loadData() {
      this.reload = true
      getTagList({
        "currentPage": this.page.current,
        "pageSize": this.page.size
      }).then(response=>{
        this.list = response.data.List
        this.count = response.data.Count
        this.reload = false
      })
    },
    handleSelectionChange(val) {
      this.selections = val
    },
    handleSizeChange(val) {
      this.page.size = val
      this.loadData()
    },
    handleCurrentChange(val) {
      this.page.current = val
      this.loadData()
    },
    handleClick(signal){
      if(signal == 'new'){
        this.tag.new_visible = true
      }else if(signal == 'update'){
        let t = this.selections[0]
        this.tag.update_visible = true
        this.tag.update_data.name = t.name
        this.tag.update_data.color = t.color
        this.tag.update_data.id = t.id
      }else if(signal == 'new-cancel'){
        this.tag.new_visible = false
      }else if(signal == 'new-ok'){
        createTag(this.tag.new_data.name, this.tag.new_data.color).then(() =>{
          this.tag.new_visible = false
          this.loadData()
        })
      }else if(signal == 'delete'){
        deleteTag(this.selections).then(()=>{
          this.loadData()
        })
      }else if (signal == 'update-ok'){
        updateTag(this.tag.update_data.id, this.tag.update_data.name, this.tag.update_data.color).then(()=>{
          this.tag.update_visible = false
          this.loadData()
        })
      }else if (signal == 'update-cancel'){
        this.tag.update_visible = false
      }
    }
  }
}
</script>

<style>
.table-button-group{
  margin-bottom: 15px;
}
.pagination{
  float: right;
  margin: 10px 30px 40px;

}
</style>
