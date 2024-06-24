document.addEventListener('DOMContentLoaded', function() {
    var menuItems = document.querySelectorAll('.item'); 

    // Load default page appearance
    updateRightColumn('name');

    // Load date/time
    function callDateTime() {
        var currentDate = (new Date()).toDateString();
        var currentTime = (new Date()).toLocaleTimeString();
        document.getElementById('header').innerHTML = `${currentDate} · ${currentTime}`;
    }

    setInterval(function() { callDateTime(); }, 1000);

    // Set clicked item to active
    menuItems.forEach(function(item) {
        item.addEventListener('click', function() {
            menuItems.forEach(function(menuItem) {
                menuItem.classList.remove('active');
            });

            item.classList.add('active');
            updateRightColumn(item);
            
        });
    });


    function updateRightColumn(item) {
        var fileToLoad = 'name.txt';
        const rightContent = document.getElementById("center-cell");

        switch(item.id) {
            case 'name':
                fileToLoad = "name.txt";
                rightContent.classList.add('ascii-image');
                break;
            case 'about':
                fileToLoad = "about.txt";
                rightContent.classList.remove('ascii-image');
                break;
            case 'portfolio':
                fileToLoad = "portfolio.txt";
                rightContent.classList.remove('ascii-image');
                break;
            case 'contact':
                fileToLoad = "contact.txt";
                rightContent.classList.remove('ascii-image');
                break;
        }

        // Load text
        fetch(fileToLoad)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(text => {
                right_text.textContent = text;
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });
    }
});


