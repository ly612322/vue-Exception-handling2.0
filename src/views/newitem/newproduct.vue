<template>
  <div id="newsheet">
    <transition mode="out-in">
      <div ref="productTic" v-if="ticshow" key="product">
        <el-card class="box-card">
          <el-form
            ref="productform"
            :model="productform"
            label-width="106px"
            class="elform"
            :rules="rules"
            size="small "
            label-position="left"
            status-icon
            :show-message="false"
          >
            <el-form-item label="异常发生时间">
              <el-date-picker
                v-model="productform.time"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择日期时间"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="异常类型" prop="type">
              <el-radio-group v-model="productform.type">
                <el-radio label="轻微"></el-radio>
                <el-radio label="重大"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="制品分类" prop="classify">
              <el-radio-group v-model="productform.classify">
                <el-radio label="试做"></el-radio>
                <el-radio label="量产"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="处置组" prop="group" class="input-lot">
              <el-select v-model="productform.group" placeholder="请选择处置组">
                <el-option label="TEST" value="TEST"></el-option>
                <el-option label="PVD" value="PVD"></el-option>
                <el-option label="CVD" value="CVD"></el-option>
                <el-option label="DET" value="DET"></el-option>
                <el-option label="WET" value="WET"></el-option>
                <el-option label="PHOTO" value="PHOTO"></el-option>
                <el-option label="C-TEST" value="C-TEST"></el-option>
                <el-option label="AT" value="AT"></el-option>
                <el-option label="前工程" value="前工程"></el-option>
                <el-option label="中工程" value="中工程"></el-option>
                <el-option label="材料管理科" value="材料管理科"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="对象LOT" prop="lot" class="input-lot">
              <el-input
                placeholder="请输入LOT"
                v-model="productform.lot"
                class="input-with-select"
                maxlength="12"
              >
                <el-button slot="append" icon="el-icon-search" @click="queryLot()" lable="查询"></el-button>
                <span slot="append" style="margin:15px" name="slite">|</span>
                <el-button slot="append" icon="el-icon-edit" @click="addLot"></el-button>
              </el-input>
            </el-form-item>
            <el-form-item label="对象SHEET" class="longinput" prop="sheet">
              <el-input
                v-input-filter
                placeholder="请输入SHEET"
                v-model="productform.sheet"
                maxlength="50"
                show-word-limit
              ></el-input>
            </el-form-item>
            <el-form-item label="对象PANEL" class="longinput">
              <el-input
                v-input-filter
                placeholder="请输入PANEL"
                v-model="productform.panel"
                maxlength="50"
                show-word-limit
              ></el-input>
            </el-form-item>
            <el-form-item label="对象备注" class="longinput">
              <el-input
                v-input-filter
                placeholder="请输入备注"
                v-model="productform.remark"
                maxlength="40"
                show-word-limit
              ></el-input>
            </el-form-item>
          </el-form>
          <el-card shadow="hover" class="box-card1 box-lot">
            <el-table
              v-loading="loading"
              :data="lotDate"
              border
              style="width: 100%"
              max-height="380"
              highlight-current-row
            >
              <el-table-column
                prop="品名"
                label="品名"
                align="center"
                :show-overflow-tooltip="true"
                sortable
              ></el-table-column>
              <el-table-column
                prop="设备"
                label="设备"
                align="center"
                width="80"
                :show-overflow-tooltip="true"
                sortable
              ></el-table-column>
              <el-table-column prop="大工程" label="大工程" align="center" width="90" sortable></el-table-column>
              <el-table-column prop="小工程" label="小工程" align="center" width="90" sortable></el-table-column>
              <el-table-column label="操作" align="center" width="60">
                <template slot-scope="scope">
                  <el-button @click="add(scope.row)" type="primary" size="small" plain>添加</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
          <el-divider content-position="center" style="margin-top:50%">已添加信息</el-divider>
          <el-card shadow="hover" class="box-card1">
            <el-table
              :data="lotallmessage"
              border
              style="width: 100%"
              max-height="350"
              highlight-current-row
            >
              <el-table-column prop="LOT" label="LOT" align="center">
                <template slot-scope="scope">
                  <span>{{scope.row.LOT}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="SHEET" label="SHEET" align="center">
                <template slot-scope="scope">
                  <span>{{scope.row.SHEET}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="PANEL" label="PANEL" align="center">
                <template slot-scope="scope">
                  <span>{{scope.row.PANEL}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="品名" label="品名" align="center">
                <template slot-scope="scope">
                  <span>{{scope.row.品名}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="设备" label="设备" align="center">
                <template slot-scope="scope">
                  <span>{{scope.row.设备}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="大工程" label="大工程" align="center">
                <template slot-scope="scope">
                  <span>{{scope.row.大工程}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="小工程" label="小工程" align="center">
                <template slot-scope="scope">
                  <span>{{scope.row.小工程}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="备注" label="备注" align="center">
                <template slot-scope="scope">
                  <span>{{scope.row.备注}}</span>
                </template>
              </el-table-column>

              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button
                    plain
                    type="primary"
                    @click.native.prevent="deleteRow(scope.$index, lotallmessage)"
                    size="small"
                  >移除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </el-card>
        <el-card class="box-card2">
          <el-row>
            <el-col :span="24" :gutter="2">
              <label class="labletext">
                <i style="color:#F56C9B;margin-right:3px">*</i>异常名称:
              </label>
              <el-button-group style="float:left;margin-left:10px;">
                <el-button
                  type="primary"
                  @click="queryname(btnname.tongyong)"
                  plain
                  size="small"
                >{{btnname.tongyong}}</el-button>
                <el-button
                  size="small"
                  type="primary"
                  @click="queryname(btnname.array)"
                  plain
                >{{btnname.array}}</el-button>
                <el-button
                  size="small"
                  type="primary"
                  @click="queryname(btnname.cell)"
                  plain
                >{{btnname.cell}}</el-button>
              </el-button-group>
            </el-col>
          </el-row>
          <el-form ref="otherform" :model="productform" :rules="rules" size="small">
            <el-form-item lable="异常名称" prop="abnormalName" style="margin:0px 0 10px 0;">
              <el-select
                class="inputselect"
                v-model="productform.abnormalName"
                filterable
                allow-create
                clearable
                default-first-option
                maxlength="20"
                show-word-limit
                placeholder="请选择异常名称"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-col>
              <label class="labletext">
                <i style="color:#F56C9B;margin-right:3px">*</i>异常描述:
              </label>
              <el-form-item lable="异常描述" prop="discribe">
                <el-input
                  type="textarea"
                  :rows="5"
                  placeholder="请输入内容"
                  maxlength="40"
                  show-word-limit
                  v-model="productform.discribe"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-form>
          <el-col>
            <label class="labletext">不良位置:</label>
            <div class="picdisplay">
              <div style="margin-left: 70%">1300</div>
              <div
                class="picture"
                :class="{red: picture.位1,green: !picture.位1}"
                @click="picture.位1=!picture.位1"
              ></div>
              <div
                class="picture"
                :class="{red: picture.位2,green: !picture.位2}"
                @click="picture.位2=!picture.位2"
              ></div>
              <div
                class="picture"
                :class="{red: picture.位3,green: !picture.位3}"
                @click="picture.位3=!picture.位3"
              ></div>
              <br />
              <div
                class="picture"
                :class="{red: picture.位4,green: !picture.位4}"
                @click="picture.位4=!picture.位4"
                style="margin-left:5%"
              ></div>

              <div
                class="picture"
                :class="{red: picture.位5,green: !picture.位5}"
                @click="picture.位5=!picture.位5"
              ></div>
              <div
                class="picture"
                :class="{red: picture.位6,green: !picture.位6}"
                @click="picture.位6=!picture.位6"
              ></div>
              <div style="width:90%">
                <span style="float:left;margin-left:15%">1100</span>
                <span style="float:right">OF</span>
              </div>
            </div>
            <el-button type="primary" class="upload" @click="upload" :loading="uploadbtn">
              提交
              <i class="el-icon-upload el-icon--right"></i>
            </el-button>
          </el-col>
        </el-card>
      </div>
    </transition>
    <transition name="item">
      <el-dialog
        title="添加"
        :visible.sync="addLotMes"
        v-if="addLotMes"
        width="22%"
        top="8%"
        destroy-on-close
        center
      >
        <el-form v-model="pmMessage" :inline="true" label-width="60px">
          <el-form-item label="品名">
            <el-input v-model="pmMessage.品名" placeholder="品名" maxlength="14" show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="设备">
            <el-input v-model="pmMessage.设备" placeholder="设备" maxlength="3" show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="大工程">
            <el-input v-model="pmMessage.大工程" placeholder="大工程" maxlength="3" show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="小工程">
            <el-input v-model="pmMessage.小工程" placeholder="小工程" maxlength="3" show-word-limit></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="addpm">确 定</el-button>
        </span>
      </el-dialog>
    </transition>
  </div>
</template>
<script>
export default {
  name: "newsheet",
  data() {
    return {
      loading: false,
      uploadbtn: false,
      ticshow: true,
      addLotMes: false,
      pmMessage: {
        品名: "",
        设备: "",
        大工程: "",
        小工程: ""
      },
      productform: {
        time: "",
        group: "",
        lot: "",
        sheet: "",
        abnormalName: "",
        panel: "",
        remark: "",
        discribe: "",
        type: "轻微",
        classify: "试做"
      },
      btnname: {
        tongyong: "通用",
        array: "ARRAY",
        cell: "CELL"
      },
      lotDate: [],
      lotallmessage: [],
      loading: false,
      isshow: true,
      picture: {
        位1: 0,
        位2: 0,
        位3: 0,
        位4: 0,
        位5: 0,
        位6: 0
      },
      options: [],
      rules: {
        time: [
          {
            type: "date",
            required: true,
            message: "请选择异常发生时间",
            trigger: "blur"
          }
        ],
        group: [{ required: true, message: "请选择处置组", trigger: "change" }],
        type: [
          {
            type: "string",
            required: true,
            message: "请至少选择一个异常类型"
          }
        ],
        lot: [{ required: true, message: "请填写Lot" }],
        classify: [
          {
            required: true,
            message: "请至少选择一个制品分类",
            trigger: "change"
          }
        ],
        sheet: [{ required: true, message: "请填写SHEET", trigger: "blur" }],
        discribe: [
          { required: true, message: "请填写异常描述", trigger: "blur" }
        ],
        abnormalName: [
          { required: true, message: "请选择异常名称", trigger: "change" }
        ]
      },
      lotDate: []
    }
  },
  methods: {
    // 根据LOT号查询品名等
    async queryLot() {
      if (this.productform.lot === "") {
        this.$message.warning("请填写LOT")
        return
      }
      this.loading = true
      const { data } = await this.$http.post(
        "/API/异常处置系统/品名工程查询_异常单_面板厂.py",
        this.$qs.stringify({
          LOT: this.productform.lot
        })
      )
      if (data.state === "") {
        this.lotDate = data.data
        this.loading = false
      } else {
        alert(data.state)
      }
    },
    addLot() {
      this.addLotMes = true
    },
    addpm() {
      this.lotDate.unshift(this.pmMessage)
      this.addLotMes = false
    },
    async queryname(group) {
      this.options = []
      if (this.productform.group === "") {
        this.$notify({
          title: "提示",
          message: "请选择处置组",
          type: "warning",
          duration: "1500"
        })
        return
      }
      const { data } = await this.$http.post(
        "/API/异常处置系统/异常名称查询_异常单_面板厂.py",
        this.$qs.stringify({
          分类: group,
          处置组: this.productform.group
        })
      )
      if (data.state === "") {
        data.data.split(",").forEach(ele => {
          this.options.push({
            value: ele,
            lable: ele
          })
        })
        this.loading = false
      } else {
        alert(data.state)
      }
    },
    // 添加LOT异常详细信息
    add(data) {         
      this.lotallmessage.push({
        LOT: this.productform.lot,
        SHEET: this.productform.sheet,
        PANEL: this.productform.panel,
        品名: data.品名,
        设备: data.设备,
        大工程: data.大工程,
        小工程: data.小工程,
        备注: this.productform.remark
      })
    },
    // 删除添加的信息
    deleteRow(index, rows) {
      rows.splice(index, 1)
    },
    // 初始异常时间
    formatTime() {
      const date = new Date()
      date.setTime(date.getTime() - 300000)
      const year = date.getFullYear()
      const month = (date.getMonth() + 1).toString().padStart(2, "0")
      const day = date
        .getDate()
        .toString()
        .padStart(2, "0")
      const hour = date
        .getHours()
        .toString()
        .padStart(2, "0")
      const minute = date
        .getMinutes()
        .toString()
        .padStart(2, "0")
      const second = date
        .getSeconds()
        .toString()
        .padStart(2, "0")
      this.productform.time = `${year}-${month}-${day} ${hour}:${minute
        .toString()
        .padStart(2, "0")}:${second}`
    },
    changeupload() {
      if (this.equipmentform.link == "是") {
        this.$notify({
          title: "提示",
          message: "请填写相关制品异常单~",
          type: "warning",
          duration: "",
          offset: 50
        })
      }
    },
    // 异常单信息上传
    async upload() {
      this.uploadbtn = true
      let place = []
      for (let [key, value] of Object.entries(this.picture)) {
        if (typeof value === "boolean") {
          place.push(Number(value))
        } else {
          place.push(value)
        }
      }
      let params = {
        工号: this.$store.state.username,
        制品_异常时间: this.productform.time,
        制品_异常类型: "制品异常",
        制品_处置组: this.productform.group,
        制品_异常程度: this.productform.type,
        制品_制品分类: this.productform.classify,
        制品_异常名称: this.productform.abnormalName,
        制品_异常描述: this.productform.discribe.replace(
          /\\+|\~+|\!+|\@+|¥+|\￥+|\^+|\&+|\*+|\(+|\)+|\'+|(\")+|\$+|`+|\“+|\”+|\‘+|\’+|\n+|\t/g,
          ""
        ),
        制品_LOT: this.lotallmessage
          .map(ele => {
            return ele.LOT
          })
          .join(),
        制品_SHEET: this.lotallmessage
          .map(ele => {
            return ele.SHEET
          })
          .join(),
        制品_PANEL: this.lotallmessage
          .map(ele => {
            return ele.PANEL
          })
          .join(),
        制品_品名: this.lotallmessage
          .map(ele => {
            return ele.品名
          })
          .join(),
        制品_设备: this.lotallmessage
          .map(ele => {
            return ele.设备
          })
          .join(),
        制品_大工程: this.lotallmessage
          .map(ele => {
            return ele.大工程
          })
          .join(),
        制品_小工程: this.lotallmessage
          .map(ele => {
            return ele.小工程
          })
          .join(),
        制品_备注: this.lotallmessage
          .map(ele => {
            return ele.备注
          })
          .join(),
        位1: place[0],
        位2: place[1],
        位3: place[2],
        位4: place[3],
        位5: place[4],
        位6: place[5],
        设备_涉及制品: "否"
      }
      const { data } = await this.$http.post(
        "/API/异常处置系统/新建_异常单_面板厂.py",
        this.$qs.stringify(params)
      )
      if (data.state == "插入成功") {
        this.uploadbtn = false
        this.$notify({
          title: "提示",
          message: "创建成功~",
          type: "success",
          duration: "2000"
        })
        this.$router.push("/home")
      } else {
        alert(data.state)
      }
    }
  },
  created() {
    this.formatTime()
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.leftbtn {
  float: left;
  margin-top: 2px;
}
.upload {
  margin-top: 13px;
  margin-left: 10%;
  width: 70%;
  height: 40px;
  font-size: 19px;
}
.elform {
  width: 50%;
  float: left;
  font-size: 13px;
}
.el-input,
.el-select {
  float: left;
  width: 95%;
}
.input-lot {
  width: 360px;
}
.el-date-editor {
  width: 220px;
}
.el-radio-group {
  float: left;
  padding-top: 6px;
}
.longinput {
  width: 98%;
}
.box-card {
  font-size: 14px;
  width: 73%;
  margin: 2px;
  float: left;
  height: 700px;
}

.box-card1 >>> .el-card__body {
  padding: 0 !important;
  border: 0;
}
.box-lot {
  height: 325px;
}
.box-card2 {
  text-align: center;
  width: 25.5%;
  padding: 0;
  float: left;
  margin-left: 0.5%;
  margin-top: 2px;
  height: 700px;
}
.labletext {
  float: left;
  line-height: 30px;
  margin-left: 10px;
}
.inputselect {
  margin: 10px 0 0 0;
  width: 100%;
}
.picdisplay {
  margin-top: 10%;
}
.el-form-item {
  margin-bottom: 10px;
}
.picture {
  display: inline-block;
  width: 14%;
  height: 105px;
  margin-left: 5%;
  background-color: #cfff45;
  border: 1px solid rgba(170, 170, 170, 0.87);
  border-radius: 2px;
  box-shadow: 4px 4px 5px #cccccc;
}
.red {
  background-color: red;
}
.green {
  background-color: #87ff50;
}
.selectitem >>> .el-select {
  width: 221px !important;
}
.selectitem >>> .el-input {
  width: 221px !important;
}
.selectitem >>> .el-textarea {
  width: 221px !important;
  height: 60px !important;
}
</style>
