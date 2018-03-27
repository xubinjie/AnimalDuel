/**
 * copyright (c) 厦门风领科技有限公司
 * http://www.fenglinghudong.com/
 * 
 * sha1加密
 * zengbinsi
 * 2017-12-07
 */




let hexcase = 0;
let b64pad = "";
let chrsz = 8;
const {ccclass, property} = cc._decorator;

@ccclass
export class FLSha1 {

    static hex_sha1 (s: string): string {
        return FLSha1.binb2hex(FLSha1.core_sha1(FLSha1.str2binb(s), s.length * chrsz));
    }

    static sha1 (s: string): string {
        return FLSha1.hex_sha1(s);
    }

    static str2binb(str: string): Array<number> {
        var bin = Array();
        var mask = (1 << chrsz) - 1;
        for (var i = 0; i < str.length * chrsz; i += chrsz)
        bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (24 - i % 32);
        return bin;
    }

    static binb2hex (binarray: Array<number>): string {
        var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
        var str = "";
        for (var i = 0; i < binarray.length * 4; i++) {
            str += hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8 + 4)) & 0xF) + hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8)) & 0xF);
        }
        return str;
    }

    static core_sha1 (x: any, len: number): Array<number> {
        /*   append   padding   */
        x[len >> 5] |= 0x80 << (24 - len % 32);
        x[((len + 64 >> 9) << 4) + 15] = len;
    
        var w = Array(80);
        var a = 1732584193;
        var b = -271733879;
        var c = -1732584194;
        var d = 271733878;
        var e = -1009589776;
    
        for (var i = 0; i < x.length; i += 16) {
            var olda = a;
            var oldb = b;
            var oldc = c;
            var oldd = d;
            var olde = e;
    
            for (var j = 0; j < 80; j++) {
                if (j < 16) w[j] = x[i + j];
                else w[j] = FLSha1.rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);
                var t = FLSha1.safe_add(FLSha1.safe_add(FLSha1.rol(a, 5), FLSha1.sha1_ft(j, b, c, d)), FLSha1.safe_add(FLSha1.safe_add(e, w[j]), FLSha1.sha1_kt(j)));
                e = d;
                d = c;
                c = FLSha1.rol(b, 30);
                b = a;
                a = t;
            }
    
            a = FLSha1.safe_add(a, olda);
            b = FLSha1.safe_add(b, oldb);
            c = FLSha1.safe_add(c, oldc);
            d = FLSha1.safe_add(d, oldd);
            e = FLSha1.safe_add(e, olde);
        }
        return Array(a, b, c, d, e);
    
    }

    static rol(num: number, cnt: number): number {
        return (num << cnt) | (num >>> (32 - cnt));
    }

    static sha1_kt(t: number): number {
        return (t < 20) ? 1518500249 : (t < 40) ? 1859775393 : (t < 60) ? -1894007588 : -899497514;
    }

    static sha1_ft(t: number, b: number, c: number, d: number): number {
        if (t < 20) return (b & c) | ((~b) & d);
        if (t < 40) return b ^ c ^ d;
        if (t < 60) return (b & c) | (b & d) | (c & d);
        return b ^ c ^ d;
    }

    static safe_add(x: number, y: number): number {
        var lsw = (x & 0xFFFF) + (y & 0xFFFF);
        var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return (msw << 16) | (lsw & 0xFFFF);
    }
}
