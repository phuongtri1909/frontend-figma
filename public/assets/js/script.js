// Biến để lưu vị trí scroll trước đó
let lastScrollTop = 0;
const header = document.querySelector('header');
const scrollThreshold = 50; // Ngưỡng scroll để ẩn/hiện header

// Hàm xử lý sự kiện scroll
if (header) {
    window.addEventListener('scroll', function () {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Xác định hướng cuộn
        if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
            // Cuộn xuống -> ẩn header
            header.classList.add('header-hidden');
        } else {
            // Cuộn lên -> hiện header
            header.classList.remove('header-hidden');
        }

        lastScrollTop = scrollTop;
    });
}

// Thêm đoạn này vào cuối file script.js
document.addEventListener('DOMContentLoaded', function () {
    // Lấy các elements
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const menuIcon = document.querySelector('.mobile-menu-toggle i');
    const body = document.body;
    const mobileVideo = document.querySelector('.mobile-menu-overlay video');

    if (menuToggle && menuIcon) {
        // Xử lý sự kiện click vào nút toggle
        menuToggle.addEventListener('click', function () {
            // Toggle class menu-open
            body.classList.toggle('menu-open');

            // Thay đổi icon từ bars sang xmark và ngược lại
            if (body.classList.contains('menu-open')) {
                menuIcon.classList.remove('fa-bars');
                menuIcon.classList.add('fa-xmark');

                // Play video khi menu mở
                if (mobileVideo) {
                    mobileVideo.play();
                }
            } else {
                menuIcon.classList.remove('fa-xmark');
                menuIcon.classList.add('fa-bars');

                // Pause video khi menu đóng (tùy chọn, để tiết kiệm tài nguyên)
                if (mobileVideo) {
                    mobileVideo.pause();
                }
            }

            // Reset animations khi đóng menu
            if (!body.classList.contains('menu-open')) {
                setTimeout(function () {
                    const mobileLogoContainer = document.querySelector(
                        '.mobile-logo-container'
                    );
                    const mobileNavButtons = document.querySelectorAll(
                        '.mobile-nav-buttons .nav-button'
                    );

                    if (mobileLogoContainer) {
                        mobileLogoContainer.style.animation = 'none';
                        mobileLogoContainer.offsetHeight; // Trigger reflow
                        mobileLogoContainer.style.animation = null;
                    }

                    mobileNavButtons.forEach(button => {
                        button.style.animation = 'none';
                        button.offsetHeight; // Trigger reflow
                        button.style.animation = null;
                    });
                }, 300);
            }
        });

        // Đóng menu khi bấm vào các nút trong menu
        const mobileNavButtons = document.querySelectorAll(
            '.mobile-nav-buttons .nav-button'
        );
        mobileNavButtons.forEach(button => {
            button.addEventListener('click', function () {
                body.classList.remove('menu-open');
                menuIcon.classList.remove('fa-xmark');
                menuIcon.classList.add('fa-bars');
            });
        });

        // Đóng menu khi resize lên desktop
        window.addEventListener('resize', function () {
            if (window.innerWidth >= 768 && body.classList.contains('menu-open')) {
                body.classList.remove('menu-open');
                menuIcon.classList.remove('fa-xmark');
                menuIcon.classList.add('fa-bars');
            }
        });
    }
});

// Timeline scroll focus effect
document.addEventListener('DOMContentLoaded', function () {
    const timelineEntries = document.querySelector('.timeline-entries');
    const entries = document.querySelectorAll('.timeline-entry');

    if (timelineEntries && entries.length > 0) {
        // Set first entry as active by default
        entries[0].classList.add('active');

        // Update active entry based on scroll position
        timelineEntries.addEventListener('scroll', function () {
            const scrollTop = timelineEntries.scrollTop;
            const containerHeight = timelineEntries.offsetHeight;

            // Find which entry is in the middle of the viewport
            let activeEntry = null;
            let smallestDistance = Infinity;

            entries.forEach(entry => {
                const rect = entry.getBoundingClientRect();
                const entryMiddle = rect.top + rect.height / 2;
                const containerMiddle =
                    timelineEntries.getBoundingClientRect().top + containerHeight / 2;
                const distance = Math.abs(entryMiddle - containerMiddle);

                if (distance < smallestDistance) {
                    smallestDistance = distance;
                    activeEntry = entry;
                }

                // Remove active class from all entries
                entry.classList.remove('active');
            });

            // Add active class to the entry closest to the middle
            if (activeEntry) {
                activeEntry.classList.add('active');
            }
        });
    }
});

// View more
document.addEventListener('DOMContentLoaded', function () {
    const viewMoreBtn = document.getElementById('view-more-btn');
    const additionalProjects = document.getElementById('additional-projects');

    if (viewMoreBtn && additionalProjects) {
        viewMoreBtn.addEventListener('click', function () {
            // Toggle the visibility of additional projects
            additionalProjects.classList.toggle('d-none');

            // Update button text based on current state
            if (additionalProjects.classList.contains('d-none')) {
                viewMoreBtn.textContent = 'View more project';
            } else {
                viewMoreBtn.textContent = 'View less';

                // Scroll to make sure the newly revealed projects are visible
                additionalProjects.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }
});

// Floating box effect
document.addEventListener('DOMContentLoaded', function () {
    const theFirstSection = document.getElementById('the-first');
    const floatingBox = document.querySelector('.floating-box');

    if (theFirstSection && floatingBox) {
        // Show floating box when mouse enters the section
        theFirstSection.addEventListener('mouseenter', function () {
            floatingBox.style.opacity = '1';
        });

        // Hide floating box when mouse leaves the section
        theFirstSection.addEventListener('mouseleave', function () {
            floatingBox.style.opacity = '0';
        });

        // Update floating box position when mouse moves
        theFirstSection.addEventListener('mousemove', function (e) {
            const x = e.clientX;
            const y = e.clientY;

            requestAnimationFrame(function () {
                floatingBox.style.left = x + 'px';
                floatingBox.style.top = y + 'px';
            });
        });
    }

    // Hide floating box initially for mobile devices
    if (window.innerWidth < 768 && floatingBox) {
        floatingBox.style.display = 'none';
    }
});

// Sticky heading effect
document.addEventListener('DOMContentLoaded', function () {
    const rows = document.querySelectorAll('.row-header'); // Chọn tất cả các row
    const headings = document.querySelectorAll('.heading-preview'); // Chọn tất cả các thẻ h3 trong col-lg-3

    if (rows.length > 0 && headings.length > 0) {
        window.addEventListener('scroll', function () {
            rows.forEach((row, index) => {
                const rect = row.getBoundingClientRect();
                const heading = headings[index];

                if (rect && heading) {
                    if (rect.top <= 0 && rect.bottom > 0) {
                        heading.classList.add('sticky-heading');
                    } else {
                        // Nếu không, loại bỏ hiệu ứng sticky
                        heading.classList.remove('sticky-heading');
                    }
                }
            });
        });
    }
});