/**
 * FlowForge - Custom Blockly Block Definitions
 * This file contains all custom block definitions for the visual automation engine
 * 
 * @requires Blockly - Loaded via CDN in index.html before this script
 * 
 * Block Categories:
 * 1. Triggers - Workflow entry points
 * 2. Variables - Data storage and manipulation
 * 3. Logic - Conditional operations
 * 4. Transform - Data transformations
 * 5. Timing - Time-based operations
 * 6. Output - Display operations
 */

/* global Blockly */

// Check if Blockly is available
if (typeof Blockly === 'undefined') {
  console.error('Blockly library not loaded. Please ensure Blockly CDN is included in index.html');
}

// ========================================
// 1. TRIGGER BLOCK - "When App Starts"
// ========================================
Blockly.Blocks['trigger_start'] = {
  init: function () {
    // Font Awesome: Bolt/Lightning icon
    const icon = new Blockly.FieldLabelSerializable('⚡');
    this.appendDummyInput()
      .appendField(icon)
      .appendField("When App Starts");
    this.setNextStatement(true, null);
    this.setColour('#EF4444'); // Vibrant red
    this.setTooltip("Entry point for the workflow");
    this.setHelpUrl("");
  }
};

// 2. SET VARIABLE BLOCK
Blockly.Blocks['set_variable'] = {
  init: function () {
    // Font Awesome: Database icon
    const icon = new Blockly.FieldLabelSerializable('�');
    this.appendDummyInput()
      .appendField(icon)
      .appendField("Set variable")
      .appendField(new Blockly.FieldTextInput("myVar"), "VAR_NAME")
      .appendField("to");
    this.appendValueInput("VALUE")
      .setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#0EA5E9'); // Vibrant sky blue
    this.setTooltip("Set a variable to a specific value");
    this.setHelpUrl("");
  }
};

// Value blocks for Set Variable
Blockly.Blocks['value_number'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldNumber(0), "NUM");
    this.setOutput(true, null);
    this.setColour('#0EA5E9'); // Vibrant sky blue
    this.setTooltip("A number value");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['value_text'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('"')
      .appendField(new Blockly.FieldTextInput("myVar"), "TEXT")
      .appendField('"');
    this.setOutput(true, null);
    this.setColour('#3498DB');
    this.setTooltip("A text value");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['value_variable'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldTextInput("myVar"), "VAR");
    this.setOutput(true, null);
    this.setColour('#10B981'); // Vibrant emerald
    this.setTooltip("Reference to a variable - outputs the actual value");
    this.setHelpUrl("");
  }
};

// 3. CONDITION BLOCK
Blockly.Blocks['condition'] = {
  init: function () {
    // Font Awesome: Code branch icon  
    const icon = new Blockly.FieldLabelSerializable('⑂');
    this.appendDummyInput()
      .appendField(icon)
      .appendField("If variable")
      .appendField(new Blockly.FieldTextInput("myVar"), "VAR_NAME");
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([
        [">", "GT"],
        ["<", "LT"],
        ["==", "EQ"],
        [">=", "GTE"],
        ["<=", "LTE"],
        ["!=", "NEQ"]
      ]), "OPERATOR");
    this.appendValueInput("COMPARE_VALUE")
      .setCheck(null);
    this.appendStatementInput("DO")
      .setCheck(null)
      .appendField("then");
    this.appendStatementInput("ELSE")
      .setCheck(null)
      .appendField("else");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#6366F1'); // Vibrant indigo
    this.setTooltip("Compare variable with a value and execute blocks based on result");
    this.setHelpUrl("");
  }
};

// 4. TRANSFORM BLOCK
Blockly.Blocks['transform'] = {
  init: function () {
    // Font Awesome: Wrench/Tools icon
    const icon = new Blockly.FieldLabelSerializable('🔧');
    this.appendDummyInput()
      .appendField(icon)
      .appendField("Transform variable")
      .appendField(new Blockly.FieldTextInput("myVar"), "VAR_NAME");
    this.appendDummyInput()
      .appendField("operation:")
      .appendField(new Blockly.FieldDropdown([
        ["multiply by 2", "MULTIPLY_2"],
        ["multiply by 10", "MULTIPLY_10"],
        ["divide by 2", "DIVIDE_2"],
        ["to uppercase", "UPPERCASE"],
        ["to lowercase", "LOWERCASE"],
        ["reverse text", "REVERSE"],
        ["add 1", "ADD_1"],
        ["subtract 1", "SUB_1"]
      ]), "OPERATION");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#14B8A6'); // Vibrant teal
    this.setTooltip("Perform operations on a variable");
    this.setHelpUrl("");
  }
};

// 5. DELAY BLOCK
Blockly.Blocks['delay'] = {
  init: function () {
    // Font Awesome: Clock icon
    const icon = new Blockly.FieldLabelSerializable('🕐');
    this.appendDummyInput()
      .appendField(icon)
      .appendField("Wait for")
      .appendField(new Blockly.FieldNumber(1, 0, 60), "SECONDS")
      .appendField("seconds");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#F59E0B'); // Vibrant amber
    this.setTooltip("Wait for a specified number of seconds");
    this.setHelpUrl("");
  }
};

// 6. OUTPUT BLOCK
Blockly.Blocks['output'] = {
  init: function () {
    // Font Awesome: Terminal/Display icon
    const icon = new Blockly.FieldLabelSerializable('▶');
    this.appendDummyInput()
      .appendField(icon)
      .appendField("Display");
    this.appendValueInput("MESSAGE")
      .setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#10B981'); // Vibrant emerald
    this.setTooltip("Display a variable value in the output panel");
    this.setHelpUrl("");
  }
};

