---
layout: base
title: Interview Prep
permalink: /interview-prep/
---

<div class="interview-prep-page">
    <h1>Interview Prep</h1>
    
    <section class="prep-section">
        <h2>How to create and populate a 2-D array</h2>
        
        <div class="code-tabs">
            <div class="tab-buttons">
                <button class="tab-button active" data-tab="python">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" class="lang-icon">
                    Python
                </button>
                <button class="tab-button" data-tab="java">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" alt="Java" class="lang-icon">
                    Java
                </button>
            </div>
            
            <div class="tab-content">
                <div class="tab-pane active" id="python">
                    <pre><code># Create a 2D array (3x3)
rows, cols = 3, 3
array = [[0 for j in range(cols)] for i in range(rows)]

# Populate with values
for i in range(rows):
    for j in range(cols):
        array[i][j] = i * cols + j + 1

# Alternative: Create and populate in one step
array = [[i * 3 + j + 1 for j in range(3)] for i in range(3)]

# Print the array
for row in array:
    print(row)</code></pre>
                </div>
                
                <div class="tab-pane" id="java">
                    <pre><code>// Create a 2D array (3x3)
int rows = 3, cols = 3;
int[][] array = new int[rows][cols];

// Populate with values
for (int i = 0; i < rows; i++) {
    for (int j = 0; j < cols; j++) {
        array[i][j] = i * cols + j + 1;
    }
}

// Print the array
for (int i = 0; i < rows; i++) {
    for (int j = 0; j < cols; j++) {
        System.out.print(array[i][j] + " ");
    }
    System.out.println();
}</code></pre>
                </div>
            </div>
        </div>
    </section>
</div>

<script>
document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', function() {
        const tabName = this.getAttribute('data-tab');
        
        // Remove active class from all buttons and panes
        document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
        
        // Add active class to clicked button and corresponding pane
        this.classList.add('active');
        document.getElementById(tabName).classList.add('active');
    });
});
</script>