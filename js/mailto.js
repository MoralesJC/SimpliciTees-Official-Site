        const ORDERS_EMAIL = "orders@examplewebsite142.com";
        const PRODUCT_NAME = "Don't Be Late Tee";
        const UNIT_PRICE = 499;
        const MIN_QTY = 1;
        const MAX_QTY = 5;

        const qtyInput = document.getElementById("quantity");
        const buyNow = document.getElementById("buyNow");
        const notice = document.getElementById("mailNotice");
        const orderText = document.getElementById("orderText");

        const phpPlain = new Intl.NumberFormat("en-PH", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

        function chosen(name) {
            return document.querySelector('input[name="' + name + '"]:checked').value;
        }

        // Keeps the quantity between the minimum and maximum
        function updateQuantity() {
            let qty = parseInt(qtyInput.value, 10);
            if (isNaN(qty) || qty < MIN_QTY) qty = MIN_QTY;
            if (qty > MAX_QTY) qty = MAX_QTY;
            qtyInput.value = qty;
            return qty;
        }

        // Builds the email, then points the BUY NOW link at it.
        function buildOrder() {
            const qty = updateQuantity();
            const colour = chosen("colour");
            const size = chosen("size");
            const subtotal = "PHP " + phpPlain.format(UNIT_PRICE * qty);

            const subject = "Order: " + PRODUCT_NAME + " (" + colour + ", " + size + ", x" + qty + ")";
            const body = [
                "Hello,",
                "",
                "I'd like to order the following:",
                "",
                "Item: " + PRODUCT_NAME,
                "Color: " + colour,
                "Size: " + size,
                "Quantity: " + qty,
                "Price each: PHP " + phpPlain.format(UNIT_PRICE),
                "Subtotal: " + subtotal + " (Shipping is calculated separately)",
                "",
                "My shipping details:",
                "Full name: ",
                "Mobile number: ",
                "Delivery address: ",
                "",
                "Thank you."
            ].join("\r\n");

            buyNow.href = "mailto:" + ORDERS_EMAIL +
                "?subject=" + encodeURIComponent(subject) +
                "&body=" + encodeURIComponent(body);

            orderText.value = "To: " + ORDERS_EMAIL + "\r\nSubject: " + subject + "\r\n\r\n" + body;
        }

        document.querySelectorAll('input[name="colour"], input[name="size"]').forEach(function (input) {
            input.addEventListener("change", buildOrder);
        });

        document.getElementById("qtyMinus").addEventListener("click", function () {
            qtyInput.value = Number(qtyInput.value) - 1;
            buildOrder();
        });

        document.getElementById("qtyPlus").addEventListener("click", function () {
            qtyInput.value = Number(qtyInput.value) + 1;
            buildOrder();
        });

        qtyInput.addEventListener("change", buildOrder);

        // Clicking the link will open the email client; this refreshes the order and shows the backup copy.
        buyNow.addEventListener("click", function () {
            buildOrder();
            notice.hidden = false;
        });

        document.getElementById("copyOrder").addEventListener("click", async function () {
            const status = document.getElementById("copyStatus");
            try {
                await navigator.clipboard.writeText(orderText.value);
                status.textContent = "Copied.";
            } catch (error) {
                orderText.select();
                status.textContent = "Press Ctrl+C (or Cmd+C) to copy.";
            }
        });

        // Image carousel: shows one image at a time
        const slides = Array.from(document.querySelectorAll(".product-slide"));
        const prevBtn = document.getElementById("prevSlide");
        const nextBtn = document.getElementById("nextSlide");
        let slideIndex = 0;

        function showSlide(index) {
            slideIndex = (index + slides.length) % slides.length;
            slides.forEach(function (slide, i) { slide.hidden = i !== slideIndex; });
        }

        prevBtn.addEventListener("click", function () { showSlide(slideIndex - 1); });
        nextBtn.addEventListener("click", function () { showSlide(slideIndex + 1); });
        prevBtn.hidden = nextBtn.hidden = slides.length < 2;
        showSlide(0);

        // The underlined "Shipping" link opens the Shipping section below
        document.getElementById("shippingLink").addEventListener("click", function () {
            document.getElementById("shippingDetails").open = true;
        });

        buildOrder();
