document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.listItem');

    Array.from(items).forEach(async (el) => {
        // Assuming the img element is a direct child of .listItem
        const img = el.querySelector('img'); // Select the img element within the .listItem
        const icon = encodeURIComponent(el.innerText.trim()); // Get and encode the text content
        
        if (icon && img) {
            try {
                const response = await fetch(`/icons/search?icon=${icon}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log('Icon URL:', data.link); // Handle the response data
                
                // Update the src attribute of the img element
                img.src = data.link;
                
            } catch (error) {
                console.error('Fetch error:', error);
            }
        }
    });
});
