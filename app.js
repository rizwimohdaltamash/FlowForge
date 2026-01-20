/**
 * FlowForge - Main Application Logic
 * Handles UI interactions, Blockly workspace initialization, and code execution
 * 
 * @requires Blockly - Loaded via CDN in index.html
 */

/* global Blockly */

/**
 * Global Variables
 */
let workspace;
let generatedCode = '';

/**
 * Initialize application when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', function() {
  initializeBlockly();
  setupEventListeners();
});

/**
 * Initialize Blockly workspace with custom configuration
 * Sets up grid, zoom, trashcan, and custom toolbox
 */
function initializeBlockly() {
  const blocklyDiv = document.getElementById('blocklyDiv');
  const toolbox = document.getElementById('toolbox');
  
  // Custom theme with black category labels and white block text
  const customTheme = Blockly.Theme.defineTheme('flowforge', {
    'base': Blockly.Themes.Classic,
    'blockStyles': {
      'colour_blocks': {
        'colourPrimary': '#a5745b',
        'colourSecondary': '#dbc7bd',
        'colourTertiary': '#c09886'
      },
      'list_blocks': {
        'colourPrimary': '#745ba5',
        'colourSecondary': '#c7bddb',
        'colourTertiary': '#9886c0'
      },
      'logic_blocks': {
        'colourPrimary': '#5b80a5',
        'colourSecondary': '#bdccdb',
        'colourTertiary': '#8899aa'
      },
      'loop_blocks': {
        'colourPrimary': '#5ba55b',
        'colourSecondary': '#bddbbd',
        'colourTertiary': '#88aa88'
      },
      'math_blocks': {
        'colourPrimary': '#5b67a5',
        'colourSecondary': '#bdc2db',
        'colourTertiary': '#8899cc'
      },
      'procedure_blocks': {
        'colourPrimary': '#995ba5',
        'colourSecondary': '#d6bddb',
        'colourTertiary': '#b088bb'
      },
      'text_blocks': {
        'colourPrimary': '#5ba58c',
        'colourSecondary': '#bddbd1',
        'colourTertiary': '#77aa99'
      },
      'variable_blocks': {
        'colourPrimary': '#a55b99',
        'colourSecondary': '#dbbdd6',
        'colourTertiary': '#bb88aa'
      }
    },
    'componentStyles': {
      'workspaceBackgroundColour': '#ffffff',
      'toolboxBackgroundColour': '#f0f0f0',
      'toolboxForegroundColour': '#000000',
      'flyoutBackgroundColour': '#f8f8f8',
      'flyoutForegroundColour': '#000000',
      'flyoutOpacity': 0.95,
      'scrollbarColour': '#666666',
      'insertionMarkerColour': '#000000',
      'insertionMarkerOpacity': 0.3,
      'scrollbarOpacity': 0.4,
      'cursorColour': '#000000',
      'selectedGlowColour': '#000000',
      'selectedGlowOpacity': 0.3,
      'replacementGlowColour': '#ffffff',
      'replacementGlowOpacity': 0.5
    },
    'fontStyle': {
      'family': 'Segoe UI, sans-serif',
      'weight': '600',
      'size': 12
    }
  });
  
  workspace = Blockly.inject(blocklyDiv, {
    toolbox: toolbox,
    grid: {
      spacing: 20,
      length: 3,
      colour: '#ccc',
      snap: true
    },
    zoom: {
      controls: true,
      wheel: true,
      startScale: 1.0,
      maxScale: 3,
      minScale: 0.3,
      scaleSpeed: 1.2
    },
    trashcan: true,
    move: {
      scrollbars: {
        horizontal: true,
        vertical: true
      },
      drag: true,
      wheel: true
    },
    renderer: 'zelos',
    theme: customTheme
  });
  
  // Add value blocks to the Variables category
  workspace.updateToolbox(getUpdatedToolbox());
  
  console.log('✅ Blockly workspace initialized');
}

// Get updated toolbox with value blocks
function getUpdatedToolbox() {
  return `
    <xml>
      <category name="Triggers" colour="#E74C3C">
        <block type="trigger_start"></block>
      </category>
      <category name="Variables" colour="#3498DB">
        <block type="set_variable">
          <value name="VALUE">
            <block type="value_number"></block>
          </value>
        </block>
        <block type="value_number"></block>
        <block type="value_text"></block>
        <block type="value_variable"></block>
      </category>
      <category name="Logic" colour="#9B59B6">
        <block type="condition">
          <value name="COMPARE_VALUE">
            <block type="value_number"></block>
          </value>
        </block>
      </category>
      <category name="Transform" colour="#1ABC9C">
        <block type="transform"></block>
      </category>
      <category name="Timing" colour="#F39C12">
        <block type="delay"></block>
      </category>
      <category name="Output" colour="#2ECC71">
        <block type="output">
          <value name="MESSAGE">
            <block type="value_variable"></block>
          </value>
        </block>
      </category>
    </xml>
  `;
}

/**
 * Setup event listeners for control buttons
 * Binds Generate, Run, and Clear buttons to their respective handlers
 */
function setupEventListeners() {
  const generateBtn = document.getElementById('generateBtn');
  const runBtn = document.getElementById('runBtn');
  const clearBtn = document.getElementById('clearBtn');
  
  generateBtn.addEventListener('click', generateCode);
  runBtn.addEventListener('click', runCode);
  clearBtn.addEventListener('click', clearWorkspace);
  
  // Auto-save on workspace change
  workspace.addChangeListener(function(event) {
    if (event.type === Blockly.Events.BLOCK_MOVE || 
        event.type === Blockly.Events.BLOCK_CHANGE ||
        event.type === Blockly.Events.BLOCK_CREATE ||
        event.type === Blockly.Events.BLOCK_DELETE) {
      autoSaveWorkflow();
    }
  });
  
  // Try to load auto-saved workflow on startup
  loadAutoSavedWorkflow();
  
  console.log('✅ Event listeners set up');
}

/**
 * Save workflow to localStorage
 */
function saveWorkflow() {
  try {
    const xml = Blockly.Xml.workspaceToDom(workspace);
    const xmlText = Blockly.Xml.domToText(xml);
    localStorage.setItem('flowforge_workflow', xmlText);
    localStorage.setItem('flowforge_saved_time', new Date().toLocaleString());
    showNotification('💾 Workflow saved successfully!', 'success');
  } catch (error) {
    console.error('Error saving workflow:', error);
    showNotification('❌ Error saving workflow: ' + error.message, 'error');
  }
}

/**
 * Load workflow from localStorage
 */
function loadWorkflow() {
  try {
    const xmlText = localStorage.getItem('flowforge_workflow');
    if (!xmlText) {
      showNotification('⚠️ No saved workflow found!', 'warning');
      return;
    }
    
    const savedTime = localStorage.getItem('flowforge_saved_time') || 'Unknown';
    
    if (confirm(`Load saved workflow from ${savedTime}?\nThis will replace your current workspace.`)) {
      workspace.clear();
      const xml = Blockly.utils.xml.textToDom(xmlText);
      Blockly.Xml.domToWorkspace(xml, workspace);
      showNotification('📂 Workflow loaded successfully!', 'success');
    }
  } catch (error) {
    console.error('Error loading workflow:', error);
    showNotification('❌ Error loading workflow: ' + error.message, 'error');
  }
}

/**
 * Auto-save workflow (silent)
 */
function autoSaveWorkflow() {
  try {
    const xml = Blockly.Xml.workspaceToDom(workspace);
    const xmlText = Blockly.Xml.domToText(xml);
    localStorage.setItem('flowforge_autosave', xmlText);
  } catch (error) {
    // Silent fail for auto-save
  }
}

/**
 * Load auto-saved workflow on startup
 */
function loadAutoSavedWorkflow() {
  try {
    const xmlText = localStorage.getItem('flowforge_autosave');
    if (xmlText && workspace.getAllBlocks().length === 0) {
      const xml = Blockly.utils.xml.textToDom(xmlText);
      Blockly.Xml.domToWorkspace(xml, workspace);
      console.log('✅ Auto-saved workflow restored');
    }
  } catch (error) {
    // Silent fail for auto-load
  }
}

/**
 * Generate JavaScript code from Blockly workspace
 * Validates workspace, checks for trigger block, and displays generated code
 * @throws {Error} If code generation fails
 */
function generateCode() {
  try {
    const codePreview = document.getElementById('codePreview');
    const blocks = workspace.getAllBlocks();
    
    // Check if workspace has blocks
    if (blocks.length === 0) {
      showNotification('⚠️ Please add some blocks to the workspace first!', 'warning');
      codePreview.innerHTML = '<code>// ❌ ERROR: No blocks in workspace\n// Add a "When App Starts" trigger block to begin</code>';
      return;
    }
    
    // Validate that there's a trigger block (workflow entry point)
    const triggerBlock = blocks.find(block => block.type === 'trigger_start');
    if (!triggerBlock) {
      showNotification('❌ Missing trigger! Add "When App Starts" block first.', 'error');
      codePreview.innerHTML = '<code>// ❌ ERROR: Missing workflow trigger\n// Every program must start with a "When App Starts" block\n// Find it in the Triggers category</code>';
      return;
    }
    
    // Validate block connections - check if trigger has connected blocks
    const topBlocks = workspace.getTopBlocks(true);
    const connectedToTrigger = topBlocks.filter(b => b.type === 'trigger_start');
    
    // Check for disconnected blocks (orphan blocks not connected to trigger)
    const orphanBlocks = topBlocks.filter(b => b.type !== 'trigger_start');
    if (orphanBlocks.length > 0) {
      const orphanTypes = orphanBlocks.map(b => b.type).join(', ');
      showNotification('⚠️ Some blocks are not connected! Connect all blocks to the trigger.', 'warning');
      codePreview.innerHTML = `<code>// ⚠️ WARNING: Disconnected blocks found!\n// These blocks are not connected: ${orphanTypes}\n// \n// Please connect ALL blocks to the "When App Starts" trigger.\n// Blocks must be snapped together like puzzle pieces.</code>`;
      return;
    }
    
    // Check if trigger has any blocks connected below it
    if (!triggerBlock.getNextBlock()) {
      showNotification('⚠️ Connect blocks below the trigger!', 'warning');
      codePreview.innerHTML = '<code>// ⚠️ WARNING: Trigger has no connected blocks\n// \n// Connect blocks below "When App Starts":\n// 1. Drag a "Set Variable" block\n// 2. Snap it below the trigger\n// 3. Add more blocks as needed</code>';
      return;
    }
    
    // Validate condition blocks have proper inputs
    const conditionBlocks = blocks.filter(b => b.type === 'condition');
    for (const condBlock of conditionBlocks) {
      const compareInput = condBlock.getInput('COMPARE_VALUE');
      if (compareInput && !compareInput.connection.targetBlock()) {
        showNotification('❌ Condition block needs a comparison value!', 'error');
        codePreview.innerHTML = '<code>// ❌ ERROR: Incomplete condition block\n// \n// The "If variable" block needs a value to compare:\n// 1. Drag a Number block to the condition\n// 2. Set the number to compare against</code>';
        return;
      }
    }
    
    // Validate set_variable blocks have values
    const setVarBlocks = blocks.filter(b => b.type === 'set_variable');
    for (const setBlock of setVarBlocks) {
      const valueInput = setBlock.getInput('VALUE');
      if (valueInput && !valueInput.connection.targetBlock()) {
        showNotification('❌ Set Variable block needs a value!', 'error');
        codePreview.innerHTML = '<code>// ❌ ERROR: Incomplete "Set Variable" block\n// \n// Add a value to the variable:\n// 1. Drag a Number or Text block\n// 2. Connect it to "Set variable ... to [here]"</code>';
        return;
      }
    }
    
    // Generate code using Blockly generator
    const rawCode = Blockly.JavaScript.workspaceToCode(workspace);
    
    // Store wrapped code for execution (hidden from user)
    generatedCode = wrapGeneratedCode(rawCode);
    
    // Display CLEAN code in preview (what user sees)
    codePreview.innerHTML = '<code>' + escapeHtml(rawCode) + '</code>';
    
    console.log('✅ Code generated successfully');
    showNotification('✅ Code generated successfully!', 'success');
  } catch (error) {
    console.error('Error generating code:', error);
    const codePreview = document.getElementById('codePreview');
    codePreview.innerHTML = '<code>// Generation Error: ' + escapeHtml(error.message) + '</code>';
    showNotification('❌ Error generating code: ' + error.message, 'error');
  }
}

/**
 * Execute generated JavaScript code safely using AsyncFunction
 * Captures output, handles errors, and displays results
 * @async
 * @throws {Error} If execution fails or times out (30s limit)
 */
async function runCode() {
  if (!generatedCode || generatedCode.trim() === '') {
    showNotification('⚠️ Please generate code first!', 'warning');
    const outputPanel = document.getElementById('outputPanel');
    outputPanel.innerHTML = '❌ No code to execute\n\nSteps:\n1. Add blocks to workspace\n2. Click "Generate Code"\n3. Click "Run"';
    return;
  }
  
  const outputPanel = document.getElementById('outputPanel');
  outputPanel.innerHTML = '🚀 Executing workflow...\n\n';
  
  try {
    // Use AsyncFunction constructor for safer execution (better than eval)
    // This creates an isolated async function scope
    const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
    const executionFunction = new AsyncFunction(generatedCode);
    
    // Execute the function and get result with timeout protection
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Execution timeout (30s limit)')), 30000)
    );
    
    const result = await Promise.race([
      executionFunction(),
      timeoutPromise
    ]);
    
    // Display captured output
    if (result && result.output && result.output.length > 0) {
      outputPanel.innerHTML = result.output.join('\n') + '\n';
    } else {
      outputPanel.innerHTML = '⚠️ No output generated\n';
    }
    
    // Handle execution result
    if (result && result.success === false) {
      outputPanel.innerHTML += `\n❌ Runtime Error: ${result.error}`;
      outputPanel.innerHTML += '\n\n💡 Tip: Check your variable names and block connections';
      showNotification('⚠️ Workflow completed with errors', 'warning');
    } else {
      outputPanel.innerHTML += '\n✅ Workflow completed successfully!';
      showNotification('✅ Workflow executed successfully!', 'success');
    }
    
    console.log('✅ Code executed successfully');
  } catch (error) {
    console.error('Error running code:', error);
    
    // Provide helpful error messages
    let errorMessage = error.message;
    let errorTip = '';
    
    if (error.message.includes('is not defined')) {
      const varName = error.message.match(/([a-zA-Z_][a-zA-Z0-9_]*) is not defined/)?.[1];
      errorTip = `\n\n💡 Tip: Variable "${varName}" is used before being set. Add a "Set Variable" block first.`;
    } else if (error.message.includes('timeout')) {
      errorTip = '\n\n💡 Tip: Workflow took too long. Check for infinite loops or reduce delay times.';
    } else if (error.message.includes('Unexpected token')) {
      errorTip = '\n\n💡 Tip: Code generation error. Try reconnecting your blocks.';
    }
    
    outputPanel.innerHTML += `\n\n❌ Execution Error: ${errorMessage}${errorTip}`;
    showNotification('❌ Error executing workflow: ' + error.message, 'error');
  }
}

/**
 * Clear workspace and reset all panels
 * Prompts user for confirmation before clearing
 */
function clearWorkspace() {
  if (confirm('⚠️ Are you sure you want to clear the workspace? This will remove all blocks and reset everything.')) {
    // Clear workspace
    workspace.clear();
    generatedCode = '';
    
    // Reset code preview
    const codePreview = document.getElementById('codePreview');
    codePreview.innerHTML = '<code>// Your generated code will appear here...\n// Drag blocks from the toolbox to create your workflow!</code>';
    
    // Reset output panel
    const outputPanel = document.getElementById('outputPanel');
    outputPanel.innerHTML = '✨ Ready to execute...\n\nDrag blocks to the workspace, click Generate, then Run!';
    
    console.log('✅ Workspace cleared');
    showNotification('🗑️ Workspace cleared successfully!', 'success');
  }
}

/**
 * Escape HTML characters for safe display in code preview
 * @param {string} text - Text to escape
 * @returns {string} Escaped HTML
 */
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Show notification with visual feedback
 * @param {string} message - Notification message
 * @param {string} type - Notification type: 'success', 'error', 'warning', 'info'
 */
function showNotification(message, type) {
  const icon = {
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️'
  }[type] || 'ℹ️';
  
  console.log(`${icon} ${message}`);
  
  // Visual feedback on buttons
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(btn => {
    const originalColor = btn.style.backgroundColor;
    if (type === 'success') {
      btn.style.opacity = '0.8';
      setTimeout(() => btn.style.opacity = '1', 200);
    }
  });
}
