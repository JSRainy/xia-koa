
var crud = new CrudService('/');

var fireInformationCmp = Utils.buildAsynCmp('./views/fireInformation.html', {
    mixins: [new AddMixin(crud)],
    data: function () {
        return {
            active: 0,
            id: '',
            dialogVisible: false,
            // rule: {
            //     name: [{ required: true, message: '请输入分类名称', trigger: 'blur' }, { max: 10, message: '长度不能大于10个字符', trigger: 'blur' }],
            //     typeSort: [{ required: true, message: '请输入排序字段', trigger: 'blur' }],
            //     note: [{ max: 20, message: '长度不能大于20个字符', trigger: 'blur' }],
            // },
            myimageurl: 'http://39.99.208.254:8172/atpdc-fc/file/uploadFile',
            floorimageurl: 'http://39.99.208.254:8172/atpdc-fc/web/FloorImage/addFloorImage',
            activeName: 'first',
            queryInfo: {
                current: 1,
                size: 5,
                isDeleted: 0,
            },
            addUrl: 'http://39.99.208.254:8172/atpdc-fc/web/organization/addOrganization',
            addMaintenanceUrl: 'http://39.99.208.254:8172/atpdc-fc/web/building/addMaintenance',
            getMaintenanceUrl: 'http://39.99.208.254:8172/atpdc-fc/web/maintenance/getMaintenanceListPage',
            deleteMaintenanceUrl: 'http://39.99.208.254:8172/atpdc-fc/web/maintenance/updateMaintenanceIsDeleted',
            updateOrganizationgUrl: 'http://39.99.208.254:8172/atpdc-fc/web/organization/updateOrganization',
            updateMaintenanceUrl: 'http://39.99.208.254:8172/atpdc-fc/web/building/updateMaintenanceById',
            buildingaddUrl: 'http://39.99.208.254:8172/atpdc-fc/web/building/addBuilding',
            buildingupdateUrl: 'http://39.99.208.254:8172/atpdc-fc/web/building/updateBuilding',
            params: {
                // current: 1,
                // size: 10,
                // organizationId:'bc409783f7de4319839304b879b0f24c'
                organizationId: '77620c2186394a4d9cd66ca8d053f0fd'
            },
            buildingparams: {
                current: 1,
                size: 10,
                // organizationId:'bc409783f7de4319839304b879b0f24c'
                organizationId: '77620c2186394a4d9cd66ca8d053f0fd'
            },
            FloorImageparams: {
                current: 1,
                size: 100,
                buildingId: '9cd1af4bc351444e86ac93e872067f75'
            },
            userlist: [],
            total: 0,
            addForm: {
                // id: '77620c2186394a4d9cd66ca8d053f0fd',
                id: '',
                organizationCode: '',
                organizationName: '',
                organizationType: '',
                fireRoomPhone: '',
                organizationAddress: '',
            },
            buildingForm: {
                organizationId: '77620c2186394a4d9cd66ca8d053f0fd',
                refugeNum: '',
                undergroundFloor: '',
                overgroundFloor: '',
                refractoryGrade: '',
                buildingName: '',
                buildingOccupyArea: '',
                fireRiskGrade: '',
            },
            addMaintenanceForm: {
                realName: ''
            },
            editMaintenanceForm: {
                realName: ''
            },
            fileList: [],
            fileListXfxk: [],
            fileListXfgl: [],
            fileListXfht: [],
            fileListOverFloor: [],
            fileListUnderFloor: [],
            options: [{
                value: '甲',
                label: '甲'
            }, {
                value: '乙',
                label: '乙'
            }, {
                value: '丙',
                label: '丙'
            }, {
                value: '丁',
                label: '丁'
            }],
            addDialogVisible: false,
            editDialogVisible: false,
        }
    },

    watch: {
        'buildingForm.undergroundFloor': {
            handler(val) {
            },
            immediate: true
        }
    },

    computed: {
        openeds() {
            return this.nowMenus.map(i => i.id);
        },
        activeMenu() {
            return this.nowMenus[0].children[this.activeIndex]
        }
    },
    methods: {

        setHeight: function () {
            var oapp = document.getElementById('app');
            var height = oapp.offsetHeight;
        },

        getUnitListPage() {
            var self = this;
            var UnitListPageparams = {
                organizationId: '77620c2186394a4d9cd66ca8d053f0fd'
            }
            return new Promise(async resolve => {
                let res = await axios.get('http://39.99.208.254:8172/atpdc-fc/web/organization/getOrganizationById', { params: UnitListPageparams });
                if (res && res.data && res.data.code === 0) {
                    this.addForm = res.data.data
                    if(res.data.data.ruleFileId){
                      this.fileList.push(await self.getFileInfo(res.data.data.ruleFileId))
                    }
                } else {
                    self.$message({
                        message: '单位信息获取失败！',
                        type: 'warning'
                    })
                    this.updateOrganizationgUrl = 'http://39.99.208.254:8172/atpdc-fc/web/organization/addOrganization'
                }
            })
        },

        getFileInfo(fileId) {
            return new Promise(async resolve => {
                let res = await axios.get(`http://39.99.208.254:8172/atpdc-fc/file/getFileById?id=${fileId}`);
                resolve({ name: res.data.data.fileNameOrigin, url: res.data.data.httpPath })
            })
        },

        //更新单位基础信息
        addUnit() {
            var self = this;
            // var addForm = {
            //     id: '92b9f5a1b88644d5a9013fe08a95212d',
            //     organizationCode: '',
            //     organizationName: '',
            //     organizationType: '',
            //     fireRoomPhone: '',
            //     organizationAddress: '',
            // }

            this.$refs.unitFormRef.validate(async valid => {
                if (valid) {
                    Utils.postReq(this.updateOrganizationgUrl, self.addForm, function (data) {
                        if (data.code === 0) {
                            self.$message({
                                message: '单位信息提交成功！',
                                type: 'success'
                            })
                        }
                        else {
                            self.$message({
                                message: '单位信息提交失败！',
                                type: 'warning'
                            })
                        }
                    })
                }
            })
        },

        //判断地址长度，切换新增/编辑接口功能
        async getBuildingListPage() {
            var self = this;
            var buildingparams = {
                current: 1,
                size: 10,
                // organizationId:'bc409783f7de4319839304b879b0f24c'
                organizationId: '77620c2186394a4d9cd66ca8d053f0fd'
            }
            return new Promise(async resolve => {
                let res = await axios.get('http://39.99.208.254:8172/atpdc-fc/web/building/getBuildingListPage', { params: buildingparams });
                if (res.data.code === 0) {
                    let buildinglist = res.data.data.dataList
                    this.buildingForm = buildinglist[0]
                    this.fileListXfgl.push(await self.getFileInfo(buildinglist[0].fireManageFile))
                    this.fileListXfxk.push(await self.getFileInfo(buildinglist[0].fireLicenseFile))
                    this.fileListXfht.push(await self.getFileInfo(buildinglist[0].fireLicenseContract))
                } else {
                    self.$message({
                        message: '建筑信息获取失败！',
                        type: 'warning'
                    })
                }
            })
        },
        //建筑信息新增
        addBuilding() {
            var self = this;
            var buildingForm = {
                organizationId: '77620c2186394a4d9cd66ca8d053f0fd',
                refugeNum: '',
                undergroundFloor: '',
                overgroundFloor: '',
                refractoryGrade: '',
                buildingName: '',
                buildingOccupyArea: '',
                fireRiskGrade: '',
            }
            this.$refs.buildingFormRef.validate(async valid => {
                console.log(valid)
                if (valid) {
                    Utils.postReq(this.buildingaddUrl, buildingForm, function (data) {
                        if (data.code === 0) {
                            self.$message({
                                message: '建筑信息提交成功！',
                                type: 'success'
                            })
                            this.buildingForm = data.data
                        }
                        else {
                            self.$message({
                                message: '建筑信息提交失败！',
                                type: 'warning'
                            })
                        }
                    })
                }
            })
        },



        async getFloorImageListPage() {
            var self = this;
            var FloorImageparams = {
                current: 1,
                size: 100,
                buildingId: '77620c2186394a4d9cd66ca8d053f0fd'
            }
            return new Promise(async resolve => {
                let FloorImageresponse = await axios.get('http://39.99.208.254:8172/atpdc-fc/web/FloorImage/getFloorImageListPage', { params: FloorImageparams });
                let FloorImageData = FloorImageresponse.data.data.dataList
                for (var i = 0; i < FloorImageData.length; i++) {
                    if (FloorImageData[i].floorNumber > 0) {
                        const data = await self.getFileInfo(FloorImageData[i].imageFileId);
                        this.fileListOverFloor.push([data])
                    }
                    else {
                        const data = await self.getFileInfo(FloorImageData[i].imageFileId);
                        this.fileListUnderFloor.push([data])
                    }
                }
            })
        },

        getMaintenance() {
            var self = this;
            var queryInfo = {
                current: 1,
                size: 5,
                isDeleted: 0,
            };
            return new Promise(async resolve => {
                let res = await axios.get(this.getMaintenanceUrl, { params: queryInfo });
                if (res.data.code === 0) {
                    self.userlist = res.data.data.dataList;
                    self.total = res.data.data.capacity;
                } else {
                    self.$message({
                        message: '维保信息获取失败！',
                        type: 'warning'
                    })
                }
            });
        },


        //监听pagesize改变事件
        handleSizeChange(newSize) {
            this.queryInfo.size = newSize
            this.getMaintenance()
        },

        //监听页码改变事件
        handleCurrentChange(newPage) {
            // console.log(newPage)
            this.queryInfo.current = newPage
            this.getMaintenance()
        },


        parentCateChanged() {
            console.log(this.selectedKeys)
        },

        handleClick(tab, event) {
            console.log(tab, event);
        },

        goBack() {
            this.$router.go(-1)
        },

        handleChange(val) {
            console.log(val);
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
            console.log(file.url);
            // console.log('file');
            // console.log(this.list[3].ruleFileUrl);
            window.location.href = file.url
        },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${file.name}？`);
        },
        handleSuccess(response, file, fileList) {
            // console.log(response)
            // console.log(response.httpCode)
            console.log(response.data.httpPath)
        },
        handleSuccessGZZD(response, file, fileList) {
            // console.log(response)
            this.addForm.ruleFileId = response.data.id
            // console.log(this.addForm.ruleFileUrl)
        },
        handleSuccessXFHT(response, file, fileList) {
            this.buildingForm.fireLicenseContract = response.data.id
        },
        handleSuccessXFGL(response, file, fileList) {
            this.buildingForm.fireManageFile = response.data.id
        },
        handleSuccessXFXK(response, file, fileList) {
            this.buildingForm.fireLicenseFile = response.data.id
        },
        handleSuccessWBHT(response, file, fileList) {
            this.addMaintenanceForm.fireLicenseFile = response.data.id
        },
        handleSuccessWBBB(response, file, fileList) {
            this.addMaintenanceForm.fireLicenseFile = response.data.id
        },
        addDialogClosed() {
            this.$refs.addMaintenanceRef.resetFields()
        },
        editDialogClosed() {
            this.$refs.editMaintenanceRef.resetFields()
        },


        formatDate(row, column) {
            // var moment = require('moment');
            // var date = row[column.property];
            // return moment(date).format("YYYY-MM-DD")
        },

        //维保档案新增
        addMaintenance() {
            var self = this;
            var addMaintenanceForm = {
                realName: ''
            }
            this.$refs.addMaintenanceRef.validate(async valid => {
                console.log(valid)
                if (valid) {
                    Utils.postReq(this.addMaintenanceUrl, addMaintenanceForm, function (data) {
                        if (data.code === 0) {
                            self.$message({
                                message: '维保档案添加成功！',
                                type: 'success'
                            })
                            this.addDialogVisible = false
                            this.getMaintenance()
                        }
                        else {
                            self.$message({
                                message: '维保档案添加失败！',
                                type: 'warning'
                            })
                        }
                    })
                }
            })
        },

        //根据ID删除对应用户信息
        async removeUserById(id) {

            var self = this;
            var queryInfo = {
                id: id,
                isDeleted: 1,
            };

            console.log(id)
            //弹框询问
            const confirmResult = await this.$confirm('此操作将删除该档案, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).catch(err => {
                return err
            })
            //如果用户确认删除，则返回字符串confirm
            console.log(confirmResult)
            if (confirmResult === 'confirm') {
                return new Promise(async resolve => {
                    let res = await axios.get(this.deleteMaintenanceUrl, { params: queryInfo });
                    if (res.data.code === 0) {
                        console.log(res.data)
                        self.$message({
                            message: '维保档案删除成功！',
                            type: 'success'
                        })
                        this.getMaintenance()
                    } else {
                        self.$message({
                            message: '维保信息删除失败！',
                            type: 'warning'
                        })
                    }
                })
            }
        },

        async showEditDialog(id) {
            this.editDialogVisible = true
            console.log(id)
            var self = this;
            var EditDialogForm = { maintenanceId: id }
            return new Promise(async resolve => {
                let res = await axios.get('http://39.99.208.254:8172/atpdc-fc/web/maintenance/getMaintenanceById', { params: EditDialogForm });
                if (res.data.code === 0) {
                    this.editForm = res.data.data
                    console.log(this.editForm)
                } else {
                    self.$message({
                        message: '编辑档案获取信息失败！',
                        type: 'warning'
                    })
                }
            })
        },

        //修改维保档案信息并提交
        editMaintenance() {
            var editMaintenanceForm = {
                realName: ''
            }
            this.$refs.editMaintenanceRef.validate(async valid => {
                console.log(valid)
                if (valid) {
                    Utils.postReq(this.updateMaintenanceUrl, editMaintenanceForm, function (data) {
                        if (data.code === 0) {
                            self.$message({
                                message: '维保档案修改成功！',
                                type: 'success'
                            })
                            this.editDialogVisible = false
                            this.getMaintenance()
                        }
                        else {
                            self.$message({
                                message: '维保档案修改失败！',
                                type: 'warning'
                            })
                        }
                    })
                }
            })
        }

    },
    created() {
        this.getMaintenance();
        this.getUnitListPage();
        this.getBuildingListPage();
        this.getFloorImageListPage();
    },
});

//路由定义
var router = new VueRouter({
    routes: [
        { path: '/fireInformation', component: fireInformationCmp, alias: '/' },
    ]
});

//vue实例
var vm = new Vue({
    el: '#app',
    router: router
});