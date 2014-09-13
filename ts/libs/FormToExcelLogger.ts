/**
 * Created by kinkuma on 9/12/14.
 */
/// <reference path="../definitions/jquery.d.ts" />

module kk{
    export class FormToExcelLogger{
        $rootNode:JQuery;
        outputTexts:string[];
        csvRowDellimiter:string = '\n';
        csvColumnDellimiter:string = '\t';

        constructor(rootID:string){
            this.$rootNode = $('#'+ rootID);
        }

        getText():string{
            this.outputTexts = [];
            this.addNodeInfoText(this.$rootNode);
            this.traverseNode(this.$rootNode.children());
            return this.outputTexts.join(this.csvRowDellimiter);
        }

        traverseNode(childrenObj:JQuery){
            childrenObj.each((index, ele)=>{
                var $ele = $(ele);
                this.addNodeInfoText($ele);
                if($ele.children().length > 0){
                    this.traverseNode($ele.children());
                }
            });
        }

        addNodeInfoText(eleObj:JQuery){
            var tagName:string = eleObj.prop('tagName').toLowerCase();
            if(tagName != "input"
                && tagName != "select"
                && tagName != "textarea"){
                return;
            }
            var texts:string[] = [];
            texts.push(tagName);
            var eleType:string = "";
            if(tagName != "select"){
                eleType = eleObj.prop('type').toLowerCase();
            }
            texts.push(eleType);
            texts.push(eleObj.prop('name'));
            texts.push(eleObj.prop('id'));
            texts.push(eleObj.val());
            var note:string = "";
            if(tagName == "input"){
                if(eleType == "radio" || eleType == "checkbox"){
                    if(eleObj.prop('checked')){
                        note = "checked";
                    }
                }
            }
            texts.push(note);
            this.outputTexts.push(texts.join(this.csvColumnDellimiter));
        }
    }
}
