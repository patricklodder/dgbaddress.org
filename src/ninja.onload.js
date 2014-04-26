window.onload = function () {

	//menu items
	unobtrusive.bindToId('singlewallet', 'click', function () { ninja.tabSwitch(this); return false; });
	unobtrusive.bindToId('bulkwallet', 'click', function () { ninja.tabSwitch(this); return false; });
	unobtrusive.bindToId('splitwallet', 'click', function () { ninja.tabSwitch(this); return false; });

	//seeding
	unobtrusive.bindToTag('body', 'mousemove', function (e) { ninja.seeder.seed(e); });
	unobtrusive.bindToTag('body', 'click', function (e) { window.SecureRandom.seedTime(); });

	//generators
	unobtrusive.bindToId('newaddress', 'click', function () { ninja.wallets.singlewallet.generateNewAddressAndKey(); return false; });
	unobtrusive.bindToId('bulkgenerate', 'click', function () {
		document.getElementById('bulktextarea').setAttribute('class', '');
		document.getElementById('bulkprintarea').setAttribute('class', 'hide');
		var num = parseInt(document.getElementById('bulklimit').value, 10);
		var idx = parseInt(document.getElementById('bulkstartindex').value, 10);
		ninja.wallets.bulkwallet.buildCSV(num, idx, false);
		return false;
	});
	unobtrusive.bindToId('splitkey', 'click', function () {
		ninja.wallets.splitwallet.splitKey();
		return false;
	});

	//split wallet
	unobtrusive.bindToId('splitstep1icon', 'click', function () {
		ninja.wallets.splitwallet.openCloseStep(1);
	});

	//printing
	unobtrusive.bindToClass('printBtn', 'click', function () { window.print(); return false; });
	unobtrusive.bindToId('bulkprint', 'click', function () {
		var bulk = document.getElementById('bulktextarea');
		var print =  document.getElementById('bulkprintarea');
		print.innerHTML='<pre>' + bulk.value + '</pre>';
		bulk.setAttribute('class', 'hide');
		print.setAttribute('class', '');
		window.print();
		return false;
	});
};


// run unit tests
//if (ninja.getQueryString()["unittests"] == "true" || ninja.getQueryString()["unittests"] == "1") {
//	ninja.unitTests.runSynchronousTests();
//	ninja.translator.showEnglishJson();
//}
// run async unit tests
//if (ninja.getQueryString()["asyncunittests"] == "true" || ninja.getQueryString()["asyncunittests"] == "1") {
//	ninja.unitTests.runAsynchronousTests();
//}
// change language
//if (ninja.getQueryString()["culture"] !== undefined) {
//	ninja.translator.translate(ninja.getQueryString()["culture"]);
//} else {
//	ninja.translator.autoDetectTranslation();
//}
// testnet, check if testnet edition should be activated
if (ninja.getQueryString()["testnet"] == "true" || ninja.getQueryString()["testnet"] == "1") {
	document.getElementById("testnet").innerHTML = ninja.translator.get("testneteditionactivated");
	document.getElementById("testnet").style.display = "block";
	document.getElementById("detailwifprefix").innerHTML = "'9'";
	document.getElementById("detailcompwifprefix").innerHTML = "'c'";
	Bitcoin.Address.networkVersion = 0x6F; // testnet
	Bitcoin.ECKey.privateKeyPrefix = 0xEF; // testnet
	ninja.testnetMode = true;
}
if (ninja.getQueryString()["showseedpool"] == "true" || ninja.getQueryString()["showseedpool"] == "1") {
	document.getElementById("seedpoolarea").style.display = "block";
}