<template>
  <div class="app-container">
    <complex-table
      v-bind:buttons="buttons"
      v-bind:search="search"
      v-on:buttonClick="handleButtonClick"
      v-on:selectionChange="handleSelectionChange">

      <el-dialog
        :visible.sync="tag.visible"
        title="创建标签"
        width="50%">

        <el-form ref="tag" :model="tag" status-icon label-width="100px">
          <el-form-item label="名字">
            <el-input v-model="tag.data.name" type="text" auto-complete="off" />
          </el-form-item>
          <el-form-item label="颜色">
            <el-input v-model="tag.data.color" type="text" auto-complete="off" />
            <el-color-picker v-model="tag.data.color" />
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="handleButtonClick('new-cancel')">取 消</el-button>
          <el-button type="primary" @click="handleButtonClick('new-ok')">确 定</el-button>
        </span>
      </el-dialog>

    </complex-table>
  </div>
</template>

<script>
import ComplexTable from '@/components/ComplexTable'

export default {
  components: {
    ComplexTable
  },
  data() {
    return {
      buttons: [
        {
          icon: 'el-icon-menu',
          name: 'update',
          display: '修改',
          signal: 'update'
        },
        {
          icon: 'el-icon-menu',
          name: 'delete',
          display: '删除',
          signal: 'delete'
        }
      ],
      reload: false,
      search: '',
      tag: {
        visible: false,
        data: {
          name: '默认标签',
          color: '#345623',
          id: ''
        }
      },
      selections: []
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val)
    }
  },

  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    handleButtonClick(val) {
      if(val == "new") {
        this.tag.visible = true
      }else if(val == 'new-cancel') {
        this.tag.visible = false
      }else if(val == 'new-ok') {
        this.tag.visible = false
      }
    },
    handleSelectionChange(val){
      this.selections = val
    }
  }
}
</script>

