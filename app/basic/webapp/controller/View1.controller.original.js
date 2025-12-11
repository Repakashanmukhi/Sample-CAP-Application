sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "sap/ui/core/Fragment"   
], function (Controller, MessageToast, MessageBox, Fragment) {
    "use strict";
    return Controller.extend("basic.controller.View1", {
        onInit: function () {
            this._oDialogCreate = null;  
            this.readBookById(1);         
        },
        onPressAdd: function () {
            if (!this._oDialogCreate) {
                this._oDialogCreate = Fragment.load({
                    id: this.getView().getId(), 
                    name: "basic.view.CreateAuthorFragment"  
                }).then(function (oDialog) {
                    this.getView().addDependent(oDialog);
                    oDialog.open();  
                }.bind(this));
            } else {
                this._oDialogCreate.open();
            }
        },
        readBookById: function (sId) {
            var oModel = this.getOwnerComponent().getModel();  
            var sPath = `/Books(${sId})`; 
            var oContextBinding = oModel.bindContext(sPath);  
            oContextBinding.requestObject().then(function (oData) {
                console.log("Book details:", oData);  
            }).catch(function (err) {
                MessageBox.error("Error reading book: " + err.message);  
            });
        },
        onCreateAuthor: function () {
            var that = this;
            var oModel = that.getView().getModel();
            var ID = sap.ui.getCore().byId("a_id").getValue();
            var Title = sap.ui.getCore().byId("a_title").getValue();
            var Name = sap.ui.getCore().byId("a_name").getValue();
            var Stock = sap.ui.getCore().byId("a_stock").getValue();
            var Price = sap.ui.getCore().byId("a_price").getValue();
            if (!ID || !Title || !Name || !Stock || !Price)  {
                sap.m.MessageToast.show("Please fill all the fields");
                return;
            }

            var oListBinding = oModel.bindList("/Books");
            oListBinding.create({
                ID: ID,
                Name: Name
            });
            oModel.submitBatch("default").then(function () {
                sap.m.MessageToast.show("Author created successfully!");
                that._oDialogCreate.close(); 
                sap.ui.getCore().byId("a_id").setValue("");  
                sap.ui.getCore().byId("a_title").setValue("");  
                sap.ui.getCore().byId("a_name").setValue("");
                sap.ui.getCore().byId("a_stock").setValue("");  
                sap.ui.getCore().byId("a_price").setValue("");  
                that.byId("list1").getBinding("items").refresh();  
            }).catch(function (err) {
                sap.m.MessageBox.error("Error creating author: " + err.message);
            });
        }
    });
});