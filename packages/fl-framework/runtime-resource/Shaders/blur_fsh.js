module.exports = 
`
#ifdef GL_ES
precision mediump float;
#endif

varying vec4 v_fragmentColor;
varying vec2 v_texCoord;

// uniform vec2 blurSize;

void main() {
    // blur size by zengbinsi 
    vec2 blurSize = vec2(30, 30);
    vec4 sum = vec4(0.0);
    sum += texture2D(CC_Texture0, v_texCoord - 0.0005 * blurSize) * 0.025;
    sum += texture2D(CC_Texture0, v_texCoord - 0.0004 * blurSize) * 0.05;
    sum += texture2D(CC_Texture0, v_texCoord - 0.0003 * blurSize) * 0.09;
    blurSize = vec2(30, -30);
    sum += texture2D(CC_Texture0, v_texCoord - 0.0002 * blurSize) * 0.12;
    sum += texture2D(CC_Texture0, v_texCoord - 0.0001 * blurSize) * 0.15;
    sum += texture2D(CC_Texture0, v_texCoord) * 0.16;
    blurSize = vec2(-30, -30);
    sum += texture2D(CC_Texture0, v_texCoord + 0.0001 * blurSize) * 0.15;
    sum += texture2D(CC_Texture0, v_texCoord + 0.0002 * blurSize) * 0.12;
    sum += texture2D(CC_Texture0, v_texCoord + 0.0003 * blurSize) * 0.09;
    blurSize = vec2(-30, 30);
    sum += texture2D(CC_Texture0, v_texCoord + 0.0004 * blurSize) * 0.05;
    sum += texture2D(CC_Texture0, v_texCoord - 0.0005 * blurSize) * 0.025;

    gl_FragColor = sum * v_fragmentColor;
}
`;
