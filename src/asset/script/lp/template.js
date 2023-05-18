/* global jQuery  MktoForms2*/
/*
 * populate "position" field
 */
(function ($,MktoForms2) {

	"use strict";

	MktoForms2.whenReady(function (form) {
		form.getFormElem().find("[name=formPosition]").val("bottom");
	});

}(jQuery,MktoForms2));

/*
 * add spacer div
 */
(function ($,MktoForms2) {

	"use strict";

	MktoForms2.whenReady(function (form) {
		form.getFormElem().find(".mktoButtonRow").before("<div class='spacer'/>");
	});

}(jQuery,MktoForms2));