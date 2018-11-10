/**
 * 실명인증 / 계좌인증
 * @constructor
 */

var Certification = function() {}
window.certification = new Certification();

Certification.prototype.formObject = {
    "originalForm" : null,  // 저장용 폼
    "sendToForm" : null  // 인증 발송용 폼
};

/**
 * 실명인증 엘리멘트 초기화
 * 인증 전송용 폼 및 통신용 iFrame 삽입
 * @param formObj
 */
Certification.prototype.initNameChk = function(formObj) {
    var serviceID = formObj.find("#ServiceID").val();
    var html = '<div class="hide" id="nameChkArea">\n' +
        '        <form class="layer-pop" name="nameChkForm" id="nameChkForm">\n' +
        '        <input type="hidden" name="name_chk" id="name_chk" value="" title="실명">\n' +
        '        <input type="hidden" name="return_url" id="return_url" value="http://tmyclass.hackers.com/api/v1/certification/nameResultSeed?service_id="' + serviceID  + ' title="리턴URL">\n' +
        '        <input type="hidden" name="name" value="" required="required" data-required-msg="이름을 입력해 주세요.">\n' +
        '        <input type="hidden" name="jumin1" value=""\n' +
        '               data-length-min="6"\n' +
        '               data-len-min-msg="주민번호 앞 6자리를 정확하게 입력해 주세요."\n' +
        '               data-length-max="6"\n' +
        '               data-len-max-msg="주민번호 앞 6자리를 정확하게 입력해 주세요."\n' +
        '               required="required"\n' +
        '               data-required-msg="주민번호 앞 6자리를 정확하게 입력해 주세요."\n' +
        '               data-field-regex="number"\n' +
        '               data-field-regex-msg="주민번호 앞 6자리는 숫자만 입력해 주세요.">\n' +
        '        <input type="hidden" name="jumin2" value=""\n' +
        '               data-length-min="7"\n' +
        '               data-len-min-msg="주민번호 뒤 7자리를 정확하게 입력해 주세요."\n' +
        '               data-length-max="7"\n' +
        '               data-len-max-msg="주민번호 뒤 7자리를 정확하게 입력해 주세요."\n' +
        '               required="required"\n' +
        '               data-required-msg="주민번호 뒤 7자리를 정확하게 입력해 주세요."\n' +
        '               data-field-regex="number"\n' +
        '               data-field-regex-msg="주민번호 뒤 7자리는 숫자만 입력해 주세요.">\n' +
        '    </form>\n' +
    '        <iframe id="iFrameCertification" name="iFrameCertification"></iframe>\n' +
    '    </div>';

    if ($("#nameChkArea").length == 0) {
        formObj.after(html);
    }

    if ($("#nameChkArea").length > 1) {
        $("#nameChkArea").remove();
        formObj.after(html);
    }

    certification.formObject.originalForm = formObj;
    certification.formObject.sendToForm = $("#nameChkArea #nameChkForm");
};

/**
 * 계좌인증 엘리멘트 초기화
 * 인증 전송용 폼 및 통신용 iFrame 삽입
 * @param formObj
 */
Certification.prototype.initAccountChk = function(formObj) {
    var serviceID = formObj.find("#ServiceID").val();
    var html = '<div class="hide" id="accountChkArea">\n' +
        '        <form class="layer-pop" name="accountChkForm" id="accountChkForm">\n' +
        '        <input type="hidden" name="account_chk" id="account_chk" value="">\n' +
        '        <input type="hidden" name="real_name" id="real_name" value="">\n' +
        '        <input type="hidden" name="return_url" id="return_url" value="http://tmyclass.hackers.com/api/v1/certification/accountResultSeed?service_id="' + serviceID  + ' title="리턴URL">\n' +
        '        <input type="hidden" name="paramAccntName" value="" required="required" data-required-msg="예금주를 입력해 주세요.">\n' +
        '        <input type="hidden" name="bank" id="bank" value=""\n' +
        '               required="required"\n' +
        '               data-required-msg="은행명을 입력해 주세요.">\n' +
        '        <input type="hidden" name="accountNo" id="accountNo" value=""\n' +
        '               required="required"\n' +
        '               data-required-msg="계좌번호를 입력해 주세요."\n' +
        '               data-field-regex="number"\n' +
        '               data-field-regex-msg="계좌번호는 숫자만 입력해 주세요.">\n' +
        '    </form>\n' +
        '        <iframe id="iFrameCertificationForAccountChk" name="iFrameCertificationForAccountChk"></iframe>\n' +
        '    </div>';

    if ($("#accountChkArea").length == 0) {
        formObj.after(html);
    }

    if ($("#accountChkArea").length > 1) {
        $("#accountChkArea").remove();
        formObj.after(html);
    }

    certification.formObject.originalForm = formObj;
    certification.formObject.sendToForm = $("#accountChkArea #accountChkForm");

};

/**
 * 실명인증 form submit
 */
Certification.prototype.sendNamePostSeed = function() {

    var originalForm = certification.formObject.originalForm;
    var sendToForm = certification.formObject.sendToForm;

    sendToForm.find("input[name=name]").val(originalForm.find("input[name=name]").val());
    sendToForm.find("input[name=jumin1]").val(originalForm.find("input[name=jumin1]").val());
    sendToForm.find("input[name=jumin2]").val(originalForm.find("input[name=jumin2]").val());

    // 폼 체크
    var frm = new HCForm("nameChkForm");
    if (!frm.validator("name")) return false;
    if (!frm.validator("jumin1")) return false;
    if (!frm.validator("jumin2")) return false;

    sendToForm.attr("method", "post");
    sendToForm.attr("action", "https://tapis.hackers.com/v1/auth/name");
    sendToForm.attr("target", "iFrameCertification");
    sendToForm.submit();
};

/**
 * 실명인증 iframe에서 작동할 함수
 */
Certification.prototype.setNameCertificationValue = function(result, msg) {
    if(result == 1){
        $('#name_chk').val('Y');
        var oriForm = certification.formObject.originalForm;
        oriForm.find("[name=name], [name=jumin1], [name=jumin2]").css("background-color", "#efefef");
        oriForm.find("[name=name]").prop("readonly", true);
        oriForm.find("[name=jumin1]").prop("readonly", true);
        oriForm.find("[name=jumin2]").prop("readonly", true);
    }else{
        $('#name_chk').val('N');
    }

    if(msg){
        if(msg == "success") msg = "실명인증에 성공했습니다.";
        if(msg == "failed") msg = "실명인증에 실패했습니다.";
        utils.alert(msg);
    }
};

/**
 * 계좌인증 form submit
 */
Certification.prototype.sendAccountPostSeed = function() {
    var originalForm = certification.formObject.originalForm;
    var sendToForm = certification.formObject.sendToForm;

    sendToForm.find("input[name=paramAccntName]").val(originalForm.find("input[name=paramAccntName]").val());
    sendToForm.find("input[name=bank]").val(originalForm.find("select[name=bank]").val());
    sendToForm.find("input[name=accountNo]").val(originalForm.find("input[name=accountNo]").val());

    // 폼 체크
    var frm = new HCForm("accountChkForm");
    if (!frm.validator("paramAccntName")) return false;
    if (!frm.validator("bank")) return false;
    if (!frm.validator("accountNo")) return false;

    var real_name = ($('#name_chk').val() == "Y")? originalForm.find("#name").val() : "";
    var accountChkParams = {
        "ServiceID": originalForm.find("#ServiceID").val(),
        "real_name": real_name,
        "paramAccntName": originalForm.find("input[name=paramAccntName]").val(),
        "bank": originalForm.find("select[name=bank]").val(),
        "accountNo": originalForm.find("input[name=accountNo]").val()
    };

    // 계좌 인증 API 호출
    actions.callApiAccountChk(accountChkParams, function (result) {
            utils.alert(result['message']);
    });
};

/**
 * 계좌인증 iframe에서 작동할 함수
 */
Certification.prototype.setAccountCertificationValue = function(rscd,paramAccntName,realName,sessionName) {
    var sendToForm = certification.formObject.sendToForm;
    if(paramAccntName == '' && $('#name_chk').val() != 'Y'){
        utils.alert('실명인증을 먼저 진행해 주시기 바랍니다.');
        sendToForm.find('#account_chk').val("N");
        return;
    }else if(paramAccntName != sessionName){
        utils.alert("고객님의 이름과 동일하지 않습니다.");
        sendToForm.find('#account_chk').val("N");
        return;
    }else if(rscd=="0000" && paramAccntName == realName){
        utils.alert("인증이 되었습니다.");
        sendToForm.find('#account_chk').val("Y");
        return;
    }else if(rscd=="0000" && paramAccntName != realName){
        utils.alert("본인명의 계좌만 이용 가능합니다.");
        sendToForm.find('#account_chk').val("N");
        return;
    }else{
        utils.alert("인증에 실패하였습니다. 확인 후 다시 시도해주세요.");
        sendToForm.find('#account_chk').val("N");
        return;
    }

    var oriForm = certification.formObject.originalForm;
    oriForm.find("[name=paramAccntName], [name=bank], [name=accountNo]").css("background-color", "#efefef");
    oriForm.find("[name=paramAccntName]").prop("readonly", true);
    oriForm.find("[name=bank]").prop("readonly", true);
    oriForm.find("[name=accountNo]").prop("readonly", true);
};