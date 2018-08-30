<template>
  <div class="app-container">
  <el-container>
    <el-header>
      asdfasdf
    </el-header>
    <el-main>
    <div style="margin-bottom: 20px;">
      <el-button :loading="refresh" icon="el-icon-refresh" type="primary" @click="loadTableData()" />
      <el-button type="primary" icon="el-icon-plus" @click="handleNew">添加</el-button>

      <el-button type="primary" icon="el-icon-menu" :disabled="single" @click="handleUpdate">修改</el-button>
      <el-button type="primary" icon="el-icon-menu" :disabled="!multi" @click="handleDelete">删除</el-button>
      <el-button type="primary" icon="el-icon-menu">更多操作&nbsp&nbsp&nbsp&nbsp<i class="el-icon-caret-bottom" /></el-button>
      <el-input
        v-model="searchString"
        style="width:20%;"
        placeholder="搜索"
        prefix-icon="el-icon-search" />
    </div>

    <el-table
      :data="list"
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
      <el-table-column label="创建时间" align="center" prop="createdAt"></el-table-column>
    </el-table>

      <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage2"
      :page-sizes="[10, 20, 50]"
      :page-size="100"
      layout="sizes, prev, pager, next"
      :total="1000">
    </el-pagination>
  </div>
          <el-dialog
        :visible.sync="tagDialogVisible"
        title="创建标签"
        width="50%">

        <el-form ref="tagForm" :model="tagForm" status-icon label-width="100px">
          <el-form-item label="名字">
            <el-input v-model="tagForm.name" type="text" auto-complete="off" />
          </el-form-item>
          <el-form-item label="颜色">
            <el-input v-model="tagForm.color" type="text" auto-complete="off" />
            <el-color-picker v-model="tagForm.color" />
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="tagCancel">取 消</el-button>
          <el-button type="primary" @click="tagSure">确 定</el-button>
        </span>
      </el-dialog>
    </el-main>
    </el-container>
  </div>
</template>

<script>
import { getTagList, createTag, updateTag, deleteTag } from '@/api/table'

export default {
  name: "ComplexTable",
  data() {
    return {
      refresh: false,
      tagDialogVisible: false,
      searchString: '',
      tagForm: {
        name: '',
        color: '#345623',
        id: ''
      },
      list: null,
      multipleSelection: [],
      new: true
    }
  },
  created() {
    this.loadTableData()
  },
  computed: {
    single: function(){
      return this.multipleSelection.length != 1
    },
    multi: function(){
      return this.multipleSelection.length > 0
    }
  },
  methods: {
    loadTableData() {
      this.refresh = true
      getTagList().then(response=>{
        this.list = response.data.List
        this.refresh = false
      })
    },
    tagCancel() {
      this.tagDialogVisible = false
    },
    tagSure() {
      if(this.new) {
        createTag(this.tagForm.name, this.tagForm.color).then(() =>{
          this.tagDialogVisible = false
          this.loadTableData()
        })
      }else{
        updateTag(this.tagForm.id, this.tagForm.name, this.tag.color).then(()=>{
          this.tagDialogVisible = false
          this.loadTableData()
        })
      }
    },
    handleNew(){
      this.tagDialogVisible = true
      this.new = true
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleUpdate(){
      let t = this.multipleSelection[0]
      this.new = false
      this.tagDialogVisible = true
      this.tagForm.name = t.name
      this.tagForm.color = t.color
      this.tagForm.id = t.id
    },
    handleDelete() {
      deleteTag(this.multipleSelection).then(()=>{
        this.loadTableData()
      })
    }
  }
}
</script>

<style>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
</style>