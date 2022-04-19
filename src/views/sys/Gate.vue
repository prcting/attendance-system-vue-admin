<template>
  <div>
    <el-form :inline="true">
      <el-form-item>
        <el-input
            v-model="searchForm.username"
            placeholder="名称"
            clearable
        >
        </el-input>
      </el-form-item>

      <el-form-item>
        <el-button @click="">查询</el-button>
      </el-form-item>

    </el-form>

    <el-table
        :data="tableData"
        tooltip-effect="dark"
        border
        stripe
        style="width: 100%">

      <el-table-column
          prop="id"
          label="编号"
          width="180">
      </el-table-column>
      <el-table-column
          prop="user.userName"
          label="员工姓名"
          width="180">
      </el-table-column>
      <el-table-column
          prop="gateDate"
          :formatter="formatDate"
          label="打卡日期"
          width="180">
      </el-table-column>
      <el-table-column
          prop="inTime"
          :formatter="formatTime"
          label="签到时间"
          width="180">
      </el-table-column>
      <el-table-column
          prop="outTime"
          :formatter="formatTime"
          label="签退时间"
          width="180">
      </el-table-column>

      <el-table-column
          prop="icon"
          label="操作">

        <template slot-scope="scope">
          <el-button type="text" @click="editHandle(scope.row.id)">编辑
          </el-button>
          <el-divider direction="vertical"></el-divider>

          <template>
            <el-popconfirm title="这是一段内容确定删除吗？"
                           @confirm="delHandle(scope.row.id)">
              <el-button type="text" slot="reference">删除</el-button>
            </el-popconfirm>
          </template>

        </template>
      </el-table-column>
    </el-table>

    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes, prev, pager, next, jumper"
        :page-sizes="[10, 20, 50, 100]"
        :current-page="current"
        :page-size="size"
        :total="total">
    </el-pagination>

  </div>
</template>

<script>
export default {
  name: "Gate",
  data() {
    return {
      searchForm: {},

      total: 0,
      size: 10,
      current: 1,

      tableData: []
    }
  },
  created() {
    this.getGateList()
  },
  methods: {
    getGateList() {
      this.$axios.get("/sys/gate/list").then(res => {
        this.tableData = res.data.data.list
        this.size = res.data.data.size
        this.current = res.data.data.current
        this.total = res.data.data.total
      })
    },

    formatDate(row, column) {
      // 获取单元格数据
      let data = row[column.property]
      if(data == null) {
        return null
      }
      let dt = new Date(data)
      return dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate()
    },
    formatTime(row,column){
      // 获取单元格数据
      let data = row[column.property]
      if(data == null) {
        return null
      }
      let dt = new Date(data)
      return dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds()
    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.size = val
      this.getGateList()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.current = val
      this.getGateList()
    },

    editHandle(id) {
    },
    delHandle(id) {
    },
  }
}
</script>

<style scoped>

.el-pagination {
  float: right;
  margin-top: 22px;
}
</style>