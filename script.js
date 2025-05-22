document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    menuToggle.addEventListener('click', function() {
      mainNav.classList.toggle('active');
    });
  
    // Add product showcase items
    const productData = [
      {
        name: "Ensemble Nuit Luxe",
        price: "159 €",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600"
      },
      {
        name: "Kimono en Soie",
        price: "189 €",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600"
      },
      {
        name: "Pyjama Satin",
        price: "129 €",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600"
      }
    ];
    
    // Size button selection
    const sizeButtons = document.querySelectorAll('.size-btn:not(.disabled)');
    
    sizeButtons.forEach(button => {
      button.addEventListener('click', function() {
        sizeButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
      });
    });
  
    // Pagination dots functionality
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
      dot.addEventListener('click', function() {
        dots.forEach(d => d.classList.remove('active'));
        this.classList.add('active');
        // Here you could add logic to change product displays
      });
    });
  });