/*
  Add Marker with Comment
    (C) あかつきみさき(みくちぃP)

  このスクリプトについて
    選択したレイヤーにプロンプト入力したテキストのコメント付きマーカーを追加するスクリプト.

  使用方法
    1.ファイル→スクリプト→スクリプトファイルの実行から実行.

  ライセンス
    MIT License

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
    var addMarker = function () {
        var actComp = app.project.activeItem;
        if (!isCompActive(actComp)) {
            return 0;
        }
        var selLayers = actComp.selectedLayers;
        if (!isLayerSelected(selLayers)) {
            var compMarkerText = prompt("Comment\nComp", "", "Add Marker with Comment");
            if (compMarkerText == null) {
                return 0;
            }
            actComp.markerProperty.setValueAtTime(actComp.time, new MarkerValue(compMarkerText));
            return 0;
        }
        var layerMarkerText = prompt("Comment\nLayers", "", "Add Marker with Comment");
        if (layerMarkerText == null) {
            return 0;
        }
        var curPro;
        for (var _i = 0, selLayers_1 = selLayers; _i < selLayers_1.length; _i++) {
            var selLayer = selLayers_1[_i];
            curPro = selLayer.property(ADBE_MARKER);
            curPro.setValueAtTime(actComp.time, new MarkerValue(layerMarkerText));
        }
        return 0;
    };
    app.beginUndoGroup("Add Marker with Comment");
    addMarker();
    app.endUndoGroup();
}).call(this);
