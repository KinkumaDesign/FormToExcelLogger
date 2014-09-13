var kk;
(function (kk) {
    var FormToExcelLogger = (function () {
        function FormToExcelLogger(rootID) {
            this.csvRowDellimiter = '\n';
            this.csvColumnDellimiter = '\t';
            this.$rootNode = $('#' + rootID);
        }
        FormToExcelLogger.prototype.getText = function () {
            this.outputTexts = [];
            this.addNodeInfoText(this.$rootNode);
            this.traverseNode(this.$rootNode.children());
            return this.outputTexts.join(this.csvRowDellimiter);
        };

        FormToExcelLogger.prototype.traverseNode = function (childrenObj) {
            var _this = this;
            childrenObj.each(function (index, ele) {
                var $ele = $(ele);
                _this.addNodeInfoText($ele);
                if ($ele.children().length > 0) {
                    _this.traverseNode($ele.children());
                }
            });
        };

        FormToExcelLogger.prototype.addNodeInfoText = function (eleObj) {
            var tagName = eleObj.prop('tagName').toLowerCase();
            if (tagName != "input" && tagName != "select" && tagName != "textarea") {
                return;
            }
            var texts = [];
            texts.push(tagName);
            var eleType = "";
            if (tagName != "select") {
                eleType = eleObj.prop('type').toLowerCase();
            }
            texts.push(eleType);
            texts.push(eleObj.prop('name'));
            texts.push(eleObj.prop('id'));
            texts.push(eleObj.val());
            var note = "";
            if (tagName == "input") {
                if (eleType == "radio" || eleType == "checkbox") {
                    if (eleObj.prop('checked')) {
                        note = "checked";
                    }
                }
            }
            texts.push(note);
            this.outputTexts.push(texts.join(this.csvColumnDellimiter));
        };
        return FormToExcelLogger;
    })();
    kk.FormToExcelLogger = FormToExcelLogger;
})(kk || (kk = {}));
