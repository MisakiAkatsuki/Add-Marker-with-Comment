/*
  Add Marker with Comment
    (C) あかつきみさき(みくちぃP)

  このスクリプトについて
    選択したレイヤーにプロンプト入力したテキストのコメント付きマーカーを追加するスクリプト.

  使用方法
    1.ファイル→スクリプト→スクリプトファイルの実行から実行.

  動作環境
    Adobe After Effects CS6以上

  バージョン情報
    2016/10/23 Ver 1.0.0 Release
*/
/// <reference path="C:/Users/RUI/OneDrive/lib/aftereffects.d.ts/ae.d.ts"/>
(function () {
    var ADBE_MARKER = "ADBE Marker";
    var isCompActive = function (comp) {
        if (!(comp && comp instanceof CompItem)) {
            return false;
        }
        else {
            return true;
        }
    };
    var isLayerSelected = function (layers) {
        if (layers.length === 0) {
            return false;
        }
        else {
            return true;
        }
    };
    var actComp = app.project.activeItem;
    if (!isCompActive(actComp)) {
        return 0;
    }
    var selLayers = actComp.selectedLayers;
    if (!isLayerSelected(selLayers)) {
        return 0;
    }
    app.beginUndoGroup("Add Marker with Comment");
    var text = prompt("Comment", "", "Add Marker with Comment");
    if (text == null) {
        return 0;
    }
    var markerObj = new MarkerValue(text);
    var curPro;
    for (var i = 0; i < selLayers.length; i++) {
        curPro = selLayers[i].property(ADBE_MARKER);
        curPro.setValueAtTime(actComp.time, markerObj);
    }
    app.endUndoGroup();
}).call(this);
