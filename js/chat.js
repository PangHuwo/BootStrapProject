$(function () {
    resetui()

    $('#btnSend').on('click', function () {
        var text = $('#ipt').val().trim();
        if (text.length <= 0) {
            return $('#ipt').val('')
        }

        //将聊天内容渲染到界面上
        $('#talk_list').append('<li class="right_word"><img src="../images/jqr/person02.png" /><span>' + text + '</span></li>')
        $('#ipt').val('')
        resetui()
        getMsg(text)
    })

    // 获取聊天机器人发送回来的消息
    function getMsg(text) {
        $.ajax({
            method: 'GET',
            url: 'http://www.liulongbin.top:3006/api/robot',
            data: {
                spoken: text,
            },
            success: function (res) {
                if (res.message === 'success') {
                    var msg = res.data.info.text
                    $('#talk_list').append('<li class="left_word"><img src="../images/jqr/person01.png" /> <span>' + msg + '</span></li>')
                    resetui()
                    getVoice(msg);
                }
            }
        })
        2

    }
    // 把文字转化为语音进行播放
    function getVoice(text) {
        $.ajax({
            method: 'GET',
            url: 'http://www.liulongbin.top:3006/api/synthesize',
            data: {
                text: text
            },
            success: function (res) {
                if (res.status === 200) {
                    $('#voice').attr('src', res.voiceUrl)
                }
            }
        })
    }
    //回车发送消息
    $('#ipt').on('keyup', function (e) {
        if (e.keyCode === 13) {
            $('#btnSend').click();
        }
    })
})