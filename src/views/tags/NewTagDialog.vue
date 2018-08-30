<template>
<el-dialog
  :visible.sync="dialogVisable"
  :before-close="handleClose"
  title="创建标签"
  width="60%">

  <el-form label-position="right" label-width="80px" :model="formTag">
    <el-form-item label="名称">
      <el-input v-model="formTag.name" />
    </el-form-item>
    <el-form-item label="颜色">
      <el-input v-model="formTag.color" />
    </el-form-item>
  </el-form>

  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisable = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisable = false">确 定</el-button>
  </span>

</el-dialog>
</template>

<script>
export default {
  name: 'NewTagDialog',
  data(){
    return {
      dialogVisable: false,
      formTag: {
        name: "",
        color: "#372233"
      }
    }
  }
}
</script>