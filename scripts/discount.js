let imageContainer = document.querySelector('.image-container-discount');
let discountBadge = document.querySelector('.discount');

if(discountBadge){
    imageContainer.addEventListener('mouseover', function(){
        discountBadge.style.transform = 'translate(-50%, -50%) scale(0.8)';
        discountBadge.style.transition = 'all 0.3s ease';
    });
    
    imageContainer.addEventListener('mouseout', function() {
        discountBadge.style.transform = 'translate(-50%, -50%) scale(1)';
    })
}