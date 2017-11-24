const bfkeyword = {
    next: '>',
    inc: '+',
    prev: '<',
    dec: '-',
    lb: '[',
    rb: ']',
    put: '.'
};

const keyword = {
    next: 'ＧＯ！ＧＯ！',
    inc: 'かわいいメノウちゃん！！',
    prev: 'Ｌ！Ｏ！Ｖ！Ｅ！',
    rb: 'メノウちゃああああああん！！',
    lb: 'ラーブリーッ！メーノウ！！',
    dec: 'メノウの可愛さ！',
    put: '宇宙一ぃぃぃ！！'
};

function Convert(str) {
    var result = '';
    for (var i = 0; i < str.length; i++) {
        var w = str[i];
        for (var k in bfkeyword) {
            if (bfkeyword[k] == w) {
                result = result + keyword[k];
            }
        }
    }

    return result;
}

function Parse(str) {
    var result = [];
    var index = 0;
    while (index < str.length) {
        var found = false;
        for (var key in keyword) {
            var w = keyword[key];
            if (str.length - index < w.length) {
                continue;
            }

            if (str.substr(index, w.length) == w) {
                result.push(key);
                found = true;
                index += w.length;
                break;
            }
        }

        if (!found) {
            index++;
        }
    }

    return result;
}

function Eval(program) {
    var memory = [];
    var callstack = [];
    var output = [];
    var ptr = 0;
    var pc = 0;
    for (; pc < program.length; ) {
        switch (program[pc]) {
            case 'next':
                ptr += 1;
                break;
            case 'inc':
                memory[ptr] = getvalue(memory[ptr]) + 1;
                break;
            case 'prev':
                ptr -= 1;
                break;
            case 'dec':
                memory[ptr] = getvalue(memory[ptr]) - 1;
                break;
            case 'lb':
                if (getvalue(memory[ptr]) == 0) {
                    var nextPc = pc + 1;
                    while (nextPc < program.length && program[nextPc] != 'rb') {
                        nextPc++;
                    }
                    pc = nextPc += 1;
                    continue;
                }
                else {
                    callstack.push(pc);
                }
                break;
            case 'rb':
                if (getvalue(memory[ptr]) != 0) {
                    if (callstack.length == 0) {
                        console.error("invalid rb");
                        return;
                    }

                    pc = callstack.pop();
                    continue;
                }
                break;
            case 'put':
                output.push(getvalue(memory[ptr]));
                break;
        }

        pc++;
    }

    if (output.length > 0) {
        var str = String.fromCharCode.apply(null, output);
        return str;
    }

    return '';

    function getvalue(v) {
        return v == null ? 0 : v;
    }
}

window.onload = function () {
    var input = document.getElementById('input');
    var output = document.getElementById('output');
    var button = document.getElementById('eval');
    
    var text = Convert('+++++++++[>++++++++>+++++++++++>+++++<<<-]>.>++.+++++++..+++.>-.------------.<++++++++.--------.+++.------.--------.>+.');
    input.value = text;

    button.onclick = function () {
        var result = Eval(Parse(input.value));
        output.value = result;
    }
};
