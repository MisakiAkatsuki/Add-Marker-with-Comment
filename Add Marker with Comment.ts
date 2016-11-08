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

(function() {
	const ADBE_MARKER:string = "ADBE Marker";

  const isCompActive = function(comp:CompItem) {
    if (!(comp && comp instanceof CompItem)) {
      return false;
    } else {
      return true;
    }
  }

  const isLayerSelected = function(layers:Layer[]) {
    if (layers.length === 0) {
      return false;
    } else {
      return true;
    }
  }

	const actComp:CompItem = <CompItem>app.project.activeItem;
  if (!isCompActive(actComp)) {
    return 0;
  }

	const selLayers:Layer[] = <Layer[]>actComp.selectedLayers;
  if (!isLayerSelected(selLayers)) {
    return 0;
  }

	app.beginUndoGroup("Add Marker with Comment");
  const text:string = prompt("Comment", "", "Add Marker with Comment");
  if(text == null){
    return 0;
  }

  const markerObj:MarkerValue = new MarkerValue(text);
  let curPro:Property;

	for (let i=0; i<selLayers.length; i++){
    curPro = <Property>selLayers[i].property(ADBE_MARKER);
    curPro.setValueAtTime(actComp.time, markerObj);
	}

	app.endUndoGroup();

}).call(this);
