document.addEventListener('DOMContentLoaded', function() {
    var menuItems = document.querySelectorAll('.item'); 

    // Initialize the page
    initPage();

    function initPage() {
        updateRightColumn('name');
        startDateTimeUpdate();
        setupMenuItems();
    }

    function startDateTimeUpdate() {
        callDateTime();
        setInterval(callDateTime, 1000);
    }

    function callDateTime() {
        var currentDate = (new Date()).toDateString();
        var currentTime = (new Date()).toLocaleTimeString();
        document.getElementById('header').innerHTML = `${currentDate} · ${currentTime}`;
    }

    function setupMenuItems() {
        menuItems.forEach(function(item) {
            item.addEventListener('click', function() {
                setActiveMenuItem(item);
                updateRightColumn(item.id);
            });
        });
    }

    function setActiveMenuItem(activeItem) {
        menuItems.forEach(function(menuItem) {
            menuItem.classList.remove('active');
        });
        activeItem.classList.add('active');
    }

    function updateRightColumn(itemId) {
        var fileToLoad = getFileToLoad(itemId);
        updateContentClass(itemId);

        if (itemId === 'contact') {
            loadContent(fileToLoad, true);
        } else if (itemId === 'portfolio'){
            loadContent(fileToLoad, true);
        } 
        else {
            loadContent(fileToLoad, false);
        }
    }

    function getFileToLoad(itemId) {
        var files = {
            name: 'name.txt',
            about: 'about.txt',
            portfolio: 'portfolio.txt',
            contact: 'contact.txt'
        };
        return files[itemId] || 'name.txt';
    }

    function updateContentClass(itemId) {
        const rightContent = document.getElementById("center-cell");
        if (itemId === 'name') {
            rightContent.classList.add('ascii-image');
        } else {
            rightContent.classList.remove('ascii-image');
        }
    }

    function loadContent(fileToLoad, additionalHTML) {
        fetch(fileToLoad)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(text => {
                const rightContent = document.getElementById("center-cell");
                rightContent.innerHTML = `<pre>${text}</pre>`;
                if (additionalHTML) {
                    switch (fileToLoad) {
                        case 'contact.txt':
                            appendContactForm(rightContent);
                            break;
                        case 'portfolio.txt':
                            appendPortfolio(rightContent);
                            break;
                    }
                }
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });
    }

    function appendContactForm(container) {
        const formHTML = `
            <form id="contactForm" action="contact.php" method="POST">
                <label for="name">Name:</label>
                <input type="text" id="name" name="name" required>

                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required>

                <label for="message">Message:</label>
                <textarea id="message" style=" resize:none; " name="message" required></textarea>
                
                <button type="submit">Send</button>
            </form>
        `;
        container.innerHTML += formHTML;

        document.getElementById('contactForm').addEventListener('submit', function(event) {
            event.preventDefault();
            
            alert('Form submitted!');
        });
    }

    function appendPortfolio(container) {
        const portfolioHTML = `
            <div class="portfolioList">
                <li>
                    <input type="checkbox" class="expend" id="expend1" />
                    <div class="desc portfolioItem">
                        <div class="portfolioItemText">
                            <div class="portfolioHeader">Personal Website</div>
                            <div style="padding-top: 5px;">
                                <p>I created this personal website to showcase my skills in web development and design. The site features a clean layout, making it easy to navigate on any device. Built with HTML, CSS, and JavaScript, it highlights my projects, achievements, and professional journey. This website reflects my ability to create engaging and user-friendly online experiences, demonstrating my proficiency with modern web technologies. </p>  
                                <br> <a href=https://github.com/clydecp/PersonalWebsite style="color: black; text-align: center;"> Link to Github</a>  
                            </div>
                        </div>
                        <label class="portfolioExpand" for="expend1">Read More</label>
                    </div>
                    <div class="ellipsesPoints" id="expend1">...</div>
                </li>

                <li>
                    <input type="checkbox" class="expend" id="expend2" />
                    <div class="desc portfolioItem">
                        <div class="portfolioItemText">
                            <div class="portfolioHeader">NLP - Binary Classification Models</div>
                            <div style="padding-top: 5px;">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin aliquam purus vel sodales varius. Aliquam dolor arcu, semper sed aliquet at, laoreet id metus. Fusce blandit arcu eu pharetra tempus. Phasellus malesuada dui ac lacus placerat rutrum. Nam lobortis tortor neque, sed dignissim nulla imperdiet eu. Praesent ac odio at tellus tempus posuere a id nisi. Ut lacinia magna a massa pharetra, dictum tempor odio egestas. Vivamus sit amet imperdiet turpis. Proin rutrum lorem at urna congue, tempus semper justo fermentum. Phasellus consectetur posuere odio sit amet euismod. Sed orci orci, venenatis eget odio id, sodales tincidunt arcu. Morbi imperdiet nisi quis facilisis pretium. Etiam eleifend malesuada ex, in commodo tellus pharetra ac. Quisque laoreet tincidunt facilisis.
                            </div>
                        </div>
                        <label class="portfolioExpand" for="expend2">Read More</label>
                    </div>
                    <div class="ellipsesPoints" id="expend2">...</div>
                </li>
            </div>

        `;
        container.innerHTML += portfolioHTML;
    }
});
