document.addEventListener("DOMContentLoaded", function(){
// POPUP REGISTER
    var button_open = document.querySelector('.user_register')
    var button_close = document.querySelector('.modal_header button')
    var modal = document.querySelector('.modal_container')

    function toggleModal(e)
    {
        modal.classList.toggle('hide')
    }

    button_open.addEventListener('click', toggleModal)
    button_close.addEventListener('click', toggleModal)
    modal.addEventListener('click', function(e){
        if(e.target == e.currentTarget)
        {
            toggleModal()
        }
    })
})

document.addEventListener("DOMContentLoaded", function(){
    // POPUP LOGIN
        var button_open = document.querySelector('.user_login')
        var button_close = document.querySelector('.login_header button')
        var login = document.querySelector('.login_container')
    
        function toggleLogin(e)
        {
            login.classList.toggle('hide')
        }
    
        button_open.addEventListener('click', toggleLogin)
        button_close.addEventListener('click', toggleLogin)
        login.addEventListener('click', function(e){
            if(e.target == e.currentTarget)
            {
                toggleLogin()
            }
        })
    })


// JS CỦA INDEX.HTML
document.addEventListener("DOMContentLoaded", function(){
    const slide = document.querySelectorAll(".bigslide");
    let currentIndex = 0;
    const length = slide.length;

    // NÚT CHỈNH SHOWSLDIES
    const buttonLeft = document.querySelector(".button_slideleft");
    const buttonRight = document.querySelector(".button_slideright");

    const handleChangeSlide = function() {
        slide[currentIndex].classList.remove("show");
        currentIndex = (currentIndex + 1) % slide.length;
        slide[currentIndex].classList.add("show");
    }

    let handleEventChangeSlide = setInterval(handleChangeSlide, 6000);

    buttonRight.addEventListener('click', function() {
        clearInterval(handleEventChangeSlide);
        handleChangeSlide();
        handleEventChangeSlide = setInterval(handleChangeSlide, 6000);
    });

    buttonLeft.addEventListener('click', function() {
        if (currentIndex == 0) {
            clearInterval(handleEventChangeSlide);
            slide[currentIndex].classList.remove("show");
            currentIndex = length - 1;
            slide[currentIndex].classList.add("show");
            handleEventChangeSlide = setInterval(handleChangeSlide, 6000);
        } else {
            clearInterval(handleEventChangeSlide);
            slide[currentIndex].classList.remove("show");
            currentIndex = (currentIndex - 1) % length;
            slide[currentIndex].classList.add("show");
            handleEventChangeSlide = setInterval(handleChangeSlide, 6000);
        }
    });
});






// JS TRANG SHOP
document.addEventListener("DOMContentLoaded", function(){
    const optionmenu = document.querySelector('.drop_down_menu')
    const selecIcon = document.querySelector('.drop_menu_content')
    const choose = document.querySelectorAll('.choosen_option')
    const chon_text = document.querySelector('.in_chon_text')
    
    selecIcon.addEventListener('click', ()=> optionmenu.classList.toggle('active'))
    choose.forEach(option =>{
        option.addEventListener('click', () =>{
            let selectedOption = option.querySelector('.choosen_option_text').innerText
            // choose_text.innerText = selectedOption;
            chon_text.innerText = selectedOption
        })
    })
})


document.addEventListener("DOMContentLoaded", function()
{
    // Code Price range
let rangeInput = document.querySelectorAll('.range_input input')
let rangeText = document.querySelectorAll('.range_text div')
let progress = document.querySelector('.progress')
let priceMax = rangeInput[0].max // priceMax sẽ trỏ đến giá trị max bên trong mỗi thẻ input[0] đầu tiên
// let priceMin = rangeInput[1].min // priceMin sẽ trỏ đến giá trị min bên trong thẻ input[1]

// vì việc 2 giá trị min và max có thể chạy lung tung, min có thể lớn hơn max
let priceGap = 10000 //Khoảng cách tối thiểu của min và max


/* tiến hành chạy 1 vòng forEach để lấy từng input ra với mỗi input
    - Với mỗi input phải lắng nghe 1 sự kiện thay đổi giá trị thì lúc này nó sẽ chạy
    1 function với toàn bộ dữ liệu của sự kiện đó là event
    - Giá trị input có value tối thiểu là 50.000 và giá trị tối đa là 5.000.000 
    - Để đạt chiều dài lớn nhất là 100% thì giá trị của nó phải là 5.000.000 - 50.000
    - Giá trị input_min hiện tại có giá trị là 50.000
    - Giả sử giá trị min_input này có giá trị là 100.000 thì cái progress cũng phải bị thu nhỏ 
    theo input_min value bởi vì progress phản ánh điểm giao của 2 input
    => Xác định khoảng cách theo phần trăm của input_min và sau đó gán vào cho progess
    + Cách chuyển 100.000 ra phần trăm:

    value = (value/priceMax)*100 

    * Trong đó: 
    + priceMax là giá trị tối đa 

    100.000 = (100.000/5.000.000)*100 = 2% 
    vậy là cái minPrice này cách left 2% và ta sẽ lấy giá trị này gán cho progress
    để cái hiệu ứng progress sẽ đi theo minPrice

    - minVal: Giá trị range input đầu tiên tức là min_input
    + Để sử dụng giá trị minVal trong tính toán thì ta phải ép kiểu nó về Int
    - positionMin: Giá trị cách left của vị trí min khi chuyển về phần trăm

    - đối với vị trí của max_input khi tính theo khoảng cách left chuyển về phần trăm thì
    Giả sử giá trị max_input có giá trị là 3.000.000
    => Khoảng cách của nó so với left là: 3.000.000 = (3.000.000/5.000.000)*100
    => Tuy nhiên max_input mình sẽ căn chỉnh theo right chứ không phải left
    Khoảng cách của max_input so với right lúc này sẽ bằng 100 - khoảng cách so với left
    100 - (3.000.000/5.000.000)*100
*/

// Hàm thêm dấu chấm phẩy phần nghìn
function format_currency(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

rangeInput.forEach(input => {
    input.addEventListener('input', (event) => {
        let minVal = parseInt(rangeInput[0].value)
        let maxVal = parseInt(rangeInput[1].value)

        // kiểm tra khoảng cách hợp lệ của min và max
        if ((maxVal - minVal) < priceGap)
        {
            /* Nếu điều này ko hợp lệ thì kiểm tra xem input của thằng nào 
                đang cố thay đổi giá trị sai 
                với event.target: thằng đang được thay đổi giá trị
            */
            if(event.target.classname === 'range_min')
            {
                // sửa lại giá trị cho thằng minVal chỉ có giá trị tối đa là
                minVal = rangeInput[0].value = maxVal - priceGap
            }
            else
            {
                maxVal = rangeInput[1].value = minVal + priceGap
            }
        }

        let positionMin = (minVal/priceMax)*100
        progress.style.left = positionMin + "%"
        let positionMax = 100 - (maxVal/priceMax)*100
        progress.style.right = positionMax + "%"

        // Hiển thị giá trị của min và max range
        // Thay đổi giá trị khoảng cách left và right của nó
        // rangeText[0].style.left = positionMin + "%"

        // Sử innerText để thay đổi nội dung cho từng đoạn text hiển thị min và max input
        rangeText[0].innerText = format_currency(minVal)
        rangeText[1].innerText = format_currency(maxVal)
    })
})

})


//setInterval được thưucj hiện để thưucj thi 1 đoạn mã sau 1 khoảng thời gian cố định 
//showSequentially được dùng để hiển thị các phần tử 1 cách tuần tự trong 1 tập hợp các phần tử

document.addEventListener("DOMContentLoaded", function() 
{
    var icon_cart_product = document.querySelector('.icon_cart')
    var icon_close_cart_product = document.querySelector('.close_popup')
    var popup_product_cart = document.querySelector('.popup_cart')
    var popup_product_cart_content = document.querySelector('.popup_content')

    function togglePopup()
    {
        popup_product_cart.classList.toggle('hide')
    }

    icon_cart_product.addEventListener('click', togglePopup)
    icon_close_cart_product.addEventListener('click', togglePopup)
    popup_product_cart.addEventListener('click', function(e)
    {
        if (!popup_product_cart_content.contains(e.target))
        {
            togglePopup()
        }
    })
})


// BESTSELLER
document.addEventListener("DOMContentLoaded", function(){
    const bestseller_optionmenu = document.querySelector('.bestseller_drop_down_menu')
    const bestseller_selecIcon = document.querySelector('.bestseller_drop_menu_content')
    const bestseller_choose = document.querySelectorAll('.bestseller_choosen_option')
    const bestseller_chon_text = document.querySelector('.bestseller_in_chon_text')

    // Vì ban đầu optionmenu là đối tượng không tồn tại vì 
    // do thuộc tính opacity: 0 để làm mất optionmenu đi khi chưa bấm nút
    // Vì thế để tránh lỗi trên console thì ta bỏ thằng này vào 1 cấu trúc điều kiện
    // để khi nào bấm vào nút thì EventListener mới thêm sự kiện thằng optionmenu vào
    if (bestseller_selecIcon)
    {
        bestseller_selecIcon.addEventListener('click', ()=> bestseller_optionmenu.classList.toggle('active'))
    }

    bestseller_choose.forEach(option =>{
        option.addEventListener('click', () =>{
            let bestseller_selectedOption = option.querySelector('.bestseller_choosen_option_text').innerText
            // choose_text.innerText = selectedOption
            bestseller_chon_text.innerText = bestseller_selectedOption
        })
    })
})

// document.addEventListener("DOMContentLoaded", function(){
//     var feedback_slide = document.querySelectorAll(".feedback_slide")
//     var Indexfeedback_slide = 0
//     const length = feedback_slide.length
//     let feedbackslideChangeAutoamic = setInterval(function() {
//     feedback_slide[Indexfeedback_slide].classList.remove("show")
//     Indexfeedback_slide = (Indexfeedback_slide + 1) % feedback_slide.length;
//     feedback_slide[Indexfeedback_slide].classList.add("show")}, 6000);
// })

