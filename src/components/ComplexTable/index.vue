<template>
  <div class="app-container">
    <div class="table-header">
      <el-button :loading="reload" icon="el-icon-refresh" type="primary" @click="handleClick('reload')" />
      <el-button type="primary" icon="el-icon-plus" @click="handleClick('new')">
        添加
      </el-button>
      <el-button type="primary" icon="el-icon-menu">更多操作&nbsp&nbsp&nbsp&nbsp<i class="el-icon-caret-bottom" />
      </el-button> 
      <el-button v-for="button in buttons"
        :class="button.icon"
        @click="handleClick(button.signal)"
        type="primary">
        {{ button.display }}
      </el-button>
      <el-input
        v-model="search"
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

    <slot></slot>
  </div>
</template>

<script>
import { getTagList, createTag, updateTag, deleteTag } from '@/api/table'

export default {
  name: "ComplexTable",
  props: [
    'buttons',
    'reload',
    'search',
    'selections'
  ],
  data() {
    return {
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
    },
    handleClick(signal){
      this.$emit('buttonClick', signal)
    },
    handleSelectionChange(val){
      this.$emit('selectionChange', val)
    }
  }
}
</script>

<style>
.table-header {
  margin-bottom: 15px;
}
</style>