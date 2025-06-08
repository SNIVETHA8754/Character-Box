
        const textarea = document.getElementById('messageInput');
        const charCount = document.getElementById('charCount');
        const remainingCount = document.getElementById('remainingCount');
        const warningMessage = document.getElementById('warningMessage');
        const progressFill = document.getElementById('progressFill');
        
        const maxLength = 200;

        function updateCounter() {
            const currentLength = textarea.value.length;
            const remaining = maxLength - currentLength;
            const percentage = (currentLength / maxLength) * 100;

            // Update character count display
            charCount.textContent = `${currentLength}/${maxLength} characters`;
            remainingCount.textContent = `${remaining} characters remaining`;

            // Update progress bar
            progressFill.style.width = `${percentage}%`;

            // Handle warning states
            if (currentLength >= maxLength) {
                // At limit
                charCount.classList.add('warning');
                remainingCount.classList.add('warning');
                remainingCount.textContent = 'Character limit reached';
                textarea.classList.add('warning');
                warningMessage.classList.add('show');
            } else if (currentLength >= maxLength * 0.9) {
                // Near limit (90% or more)
                charCount.classList.add('warning');
                remainingCount.classList.add('warning');
                textarea.classList.remove('warning');
                warningMessage.classList.remove('show');
            } else {
                // Normal state
                charCount.classList.remove('warning');
                remainingCount.classList.remove('warning');
                textarea.classList.remove('warning');
                warningMessage.classList.remove('show');
            }
        }

        // Add event listener for real-time updates
        textarea.addEventListener('input', updateCounter);

        // Prevent typing when limit is reached
        textarea.addEventListener('keydown', function(e) {
            const currentLength = textarea.value.length;
            
            // Allow backspace, delete, arrow keys, etc.
            const allowedKeys = [
                'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 
                'ArrowUp', 'ArrowDown', 'Home', 'End', 'Tab'
            ];
            
            // Allow Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X, Ctrl+Z
            if (e.ctrlKey || e.metaKey) {
                return;
            }
            
            // If at limit and not using allowed keys, prevent input
            if (currentLength >= maxLength && !allowedKeys.includes(e.key)) {
                e.preventDefault();
            }
        });

        // Initialize counter on page load
        updateCounter();
    