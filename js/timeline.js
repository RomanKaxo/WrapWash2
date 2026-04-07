// Timeline animation on scroll
document.addEventListener('DOMContentLoaded', function() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Přidej animaci s postupným zpožděním
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, index * 700); // 300ms zpoždění mezi jednotlivými položkami
            }
        });
    }, {
        threshold: 0.2 // Spustí se když je 20% elementu viditelné
    });
    
    timelineItems.forEach(item => {
        observer.observe(item);
    });
});