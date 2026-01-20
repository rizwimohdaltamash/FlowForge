/**
 * FlowForge - JavaScript Code Generators
 * Generates clean, readable JavaScript code from visual blocks
 */

/* global Blockly */

if (typeof Blockly === 'undefined') {
  console.error('Blockly library not loaded!');
}

const javascriptGenerator = Blockly.JavaScript;

// ========================================
// 1. TRIGGER START BLOCK
// ========================================
javascriptGenerator.forBlock['trigger_start'] = function(block) {
  return '// Program Start\n\n';
};

// ========================================
// 2. SET VARIABLE BLOCK
// var myVar = 10;
// ========================================
javascriptGenerator.forBlock['set_variable'] = function(block) {
  const varName = block.getFieldValue('VAR_NAME') || 'myVar';
  const value = javascriptGenerator.valueToCode(block, 'VALUE', javascriptGenerator.ORDER_ATOMIC) || '0';
  const safeVarName = varName.replace(/[^a-zA-Z0-9_]/g, '_');
  
  return `var ${safeVarName} = ${value};\n`;
};

// ========================================
// VALUE BLOCKS
// ========================================
javascriptGenerator.forBlock['value_number'] = function(block) {
  const num = block.getFieldValue('NUM') || 0;
  return [String(num), javascriptGenerator.ORDER_ATOMIC];
};

javascriptGenerator.forBlock['value_text'] = function(block) {
  const text = block.getFieldValue('TEXT') || '';
  const escaped = text.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
  return [`"${escaped}"`, javascriptGenerator.ORDER_ATOMIC];
};

javascriptGenerator.forBlock['value_variable'] = function(block) {
  const varName = block.getFieldValue('VAR') || 'myVar';
  const safeVarName = varName.replace(/[^a-zA-Z0-9_]/g, '_');
  return [safeVarName, javascriptGenerator.ORDER_ATOMIC];
};

// ========================================
// 3. CONDITION BLOCK
// if (myVar > 5) { ... } else { ... }
// ========================================
javascriptGenerator.forBlock['condition'] = function(block) {
  const varName = block.getFieldValue('VAR_NAME') || 'myVar';
  const operator = block.getFieldValue('OPERATOR') || 'GT';
  const compareValue = javascriptGenerator.valueToCode(block, 'COMPARE_VALUE', javascriptGenerator.ORDER_ATOMIC) || '0';
  const thenCode = javascriptGenerator.statementToCode(block, 'DO') || '';
  const elseCode = javascriptGenerator.statementToCode(block, 'ELSE') || '';
  
  const safeVarName = varName.replace(/[^a-zA-Z0-9_]/g, '_');
  
  const operators = {
    'GT': '>',
    'LT': '<',
    'EQ': '==',
    'GTE': '>=',
    'LTE': '<=',
    'NEQ': '!='
  };
  const op = operators[operator] || '>';
  
  let code = `if (${safeVarName} ${op} ${compareValue}) {\n`;
  if (thenCode.trim()) {
    code += thenCode;
  }
  code += `}`;
  
  if (elseCode.trim()) {
    code += ` else {\n`;
    code += elseCode;
    code += `}`;
  }
  
  code += '\n\n';
  return code;
};

// ========================================
// 4. TRANSFORM BLOCK
// myVar = myVar * 2; or myVar++;
// ========================================
javascriptGenerator.forBlock['transform'] = function(block) {
  const varName = block.getFieldValue('VAR_NAME') || 'myVar';
  const operation = block.getFieldValue('OPERATION') || 'MULTIPLY_2';
  const safeVarName = varName.replace(/[^a-zA-Z0-9_]/g, '_');
  
  const operations = {
    'MULTIPLY_2': `${safeVarName} = ${safeVarName} * 2;`,
    'MULTIPLY_10': `${safeVarName} = ${safeVarName} * 10;`,
    'DIVIDE_2': `${safeVarName} = ${safeVarName} / 2;`,
    'ADD_1': `${safeVarName}++;`,
    'SUB_1': `${safeVarName}--;`,
    'UPPERCASE': `${safeVarName} = ${safeVarName}.toUpperCase();`,
    'LOWERCASE': `${safeVarName} = ${safeVarName}.toLowerCase();`,
    'REVERSE': `${safeVarName} = ${safeVarName}.split("").reverse().join("");`
  };
  
  return `  ${operations[operation] || operations['MULTIPLY_2']}\n`;
};

// ========================================
// 5. DELAY BLOCK
// ========================================
javascriptGenerator.forBlock['delay'] = function(block) {
  const seconds = block.getFieldValue('SECONDS') || 1;
  return `// Wait ${seconds} second(s)\nawait delay(${seconds});\n\n`;
};

// ========================================
// 6. OUTPUT BLOCK
// console.log(value);
// ========================================
javascriptGenerator.forBlock['output'] = function(block) {
  const message = javascriptGenerator.valueToCode(block, 'MESSAGE', javascriptGenerator.ORDER_ATOMIC) || '""';
  return `console.log(${message});\n`;
};

// ========================================
// WRAP CODE FOR DISPLAY (Clean version)
// ========================================
function getCleanCode(rawCode) {
  return rawCode;
}

// ========================================
// WRAP CODE FOR EXECUTION (With helpers)
// ========================================
function wrapGeneratedCode(rawCode) {
  return `
const output = [];
const _log = console.log;
console.log = (...args) => { 
  const msg = args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ');
  output.push(msg); 
  _log(...args); 
};
const delay = (s) => new Promise(r => setTimeout(r, s * 1000));

try {
${rawCode}
  console.log = _log;
  return { success: true, output };
} catch (e) {
  console.log = _log;
  return { success: false, output, error: e.message };
}`;
}

// Export
if (typeof window !== 'undefined') {
  window.wrapGeneratedCode = wrapGeneratedCode;
  window.getCleanCode = getCleanCode;
}

console.log('✅ FlowForge generators loaded');
