// tests/todo-app.spec.js
const { test, expect } = require('@playwright/test');

// Test 1: Check if page loads
test('todo app should load', async ({ page }) => {
  // Go to the demo website
  await page.goto('https://demo.playwright.dev/todomvc');
  
  // Check if input box exists
  await expect(page.locator('.new-todo')).toBeVisible();
  console.log('✅ Page loaded successfully');
});

// Test 2: Add a new todo
test('should add a new todo item', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc');
  
  // Type in the input box
  await page.fill('.new-todo', 'Learn Playwright');
  
  // Press Enter to add
  await page.press('.new-todo', 'Enter');
  
  // Check if todo was added
  await expect(page.locator('.todo-list li')).toHaveCount(1);
  await expect(page.locator('.todo-list li')).toContainText('Learn Playwright');
  console.log('✅ Todo added successfully');
});

// Test 3: Add multiple todos
test('should add multiple todos', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc');
  
  // Add first todo
  await page.fill('.new-todo', 'Buy groceries');
  await page.press('.new-todo', 'Enter');
  
  // Add second todo
  await page.fill('.new-todo', 'Walk the dog');
  await page.press('.new-todo', 'Enter');
  
  // Add third todo
  await page.fill('.new-todo', 'Read a book');
  await page.press('.new-todo', 'Enter');
  
  // Check if all 3 todos exist
  await expect(page.locator('.todo-list li')).toHaveCount(3);
  console.log('✅ Multiple todos added');
});

// Test 4: Mark todo as complete
test('should mark todo as completed', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc');
  
  // Add a todo
  await page.fill('.new-todo', 'Complete this task');
  await page.press('.new-todo', 'Enter');
  
  // Click the checkbox to mark as complete
  await page.click('.todo-list li .toggle');
  
  // Check if todo is marked as completed
  await expect(page.locator('.todo-list li')).toHaveClass(/completed/);
  console.log('✅ Todo marked as complete');
});

// Test 5: Delete a todo
test('should delete a todo item', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc');
  
  // Add a todo
  await page.fill('.new-todo', 'Task to delete');
  await page.press('.new-todo', 'Enter');
  
  // Hover over the todo to show delete button
  await page.hover('.todo-list li');
  
  // Click delete button
  await page.click('.todo-list li .destroy');
  
  // Check if todo is deleted (list should be empty)
  await expect(page.locator('.todo-list li')).toHaveCount(0);
  console.log('✅ Todo deleted successfully');
});

// Test 6: Edit a todo
test('should edit a todo item', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc');
  
  // Add a todo
  await page.fill('.new-todo', 'Original task');
  await page.press('.new-todo', 'Enter');
  
  // Double click to edit
  await page.dblclick('.todo-list li label');
  
  // Clear and type new text
  await page.fill('.todo-list li .edit', 'Updated task');
  await page.press('.todo-list li .edit', 'Enter');
  
  // Check if todo was updated
  await expect(page.locator('.todo-list li label')).toContainText('Updated task');
  console.log('✅ Todo edited successfully');
});

// Test 7: Filter todos (All/Active/Completed)
test('should filter todos correctly', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc');
  
  // Add two todos
  await page.fill('.new-todo', 'Active task');
  await page.press('.new-todo', 'Enter');
  
  await page.fill('.new-todo', 'Completed task');
  await page.press('.new-todo', 'Enter');
  
  // Mark second todo as complete
  await page.click('.todo-list li:nth-child(2) .toggle');
  
  // Click "Active" filter
  await page.click('a[href="#/active"]');
  await expect(page.locator('.todo-list li')).toHaveCount(1);
  
  // Click "Completed" filter
  await page.click('a[href="#/completed"]');
  await expect(page.locator('.todo-list li')).toHaveCount(1);
  
  // Click "All" filter
  await page.click('a[href="#/"]');
  await expect(page.locator('.todo-list li')).toHaveCount(2);
  
  console.log('✅ Filters working correctly');
});
// Test 8: Clear completed todos
test('should clear completed todos', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc');
  
  // Add two todos
  await page.fill('.new-todo', 'Task 1');
  await page.press('.new-todo', 'Enter');
  await page.fill('.new-todo', 'Task 2');
  await page.press('.new-todo', 'Enter');
  
  // Mark first todo as complete
  await page.click('.todo-list li:first-child .toggle');
  
  // Click "Clear completed" button
  await page.click('.clear-completed');
  
  // Only 1 todo should remain
  await expect(page.locator('.todo-list li')).toHaveCount(1);
  console.log('✅ Completed todos cleared');
});
// Test 9: Check todo counter
test('should show correct item count', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc');
  
  // Add 3 todos
  await page.fill('.new-todo', 'Task 1');
  await page.press('.new-todo', 'Enter');
  await page.fill('.new-todo', 'Task 2');
  await page.press('.new-todo', 'Enter');
  await page.fill('.new-todo', 'Task 3');
  await page.press('.new-todo', 'Enter');
  
  // Should show "3 items left"
  await expect(page.locator('.todo-count')).toContainText('3 items left');
  
  // Mark one as complete
  await page.click('.todo-list li:first-child .toggle');
  
  // Should now show "2 items left"
  await expect(page.locator('todo-count')).toContainText('2 items left');
});