document.getElementById('uiSwitch').addEventListener('change', function () {
    if (this.checked) {
        switchToFairUI();
    } else {
        switchToDeceptiveUI();
    }
});

function switchToFairUI() {
    document.getElementById("fairUI").style.display = "block";
    document.getElementById("deceptiveUI").style.display = "none";
    document.getElementById("attention").style.display = "none";
    const serviceFeeNotice = document.querySelector("p[style='font-size: 0.7em;']");
    serviceFeeNotice.style.opacity = 1;
    serviceFeeNotice.style.color = "rgb(0, 0, 0)";
}

function switchToDeceptiveUI() {
    document.getElementById("fairUI").style.display = "none";
    document.getElementById("deceptiveUI").style.display = "block";
    document.getElementById("attention").style.display = "block";
    const serviceFeeNotice = document.querySelector("p[style='font-size: 0.7em;']");
    serviceFeeNotice.style.opacity = 0.6;
    serviceFeeNotice.style.color = "rgb(50, 43, 43)";
}

const branchGrades = {
    Tokyo: [
        { grade: "エコノミー", price: 10000 },
        { grade: "ビジネス", price: 15000 },
        { grade: "ラグジュアリー", price: 25000 }
    ],
    Nagoya: [
        { grade: "エコノミー", price: 9000 },
        { grade: "ビジネス", price: 14000 },
        { grade: "ラグジュアリー", price: 24000 }
    ],
    Sapporo: [
        { grade: "エコノミー", price: 8000 },
        { grade: "ビジネス", price: 13000 },
        { grade: "ラグジュアリー", price: 23000 }
    ],
    Osaka: [
        { grade: "エコノミー", price: 11000 },
        { grade: "ビジネス", price: 16000 },
        { grade: "ラグジュアリー", price: 26000 }
    ],
    Fukuoka: [
        { grade: "エコノミー", price: 9500 },
        { grade: "ビジネス", price: 14500 },
        { grade: "ラグジュアリー", price: 24500 }
    ]
};

document.getElementById("place").addEventListener("change", function () {
    updateGrades("place", "grade", "gradeSelection");
});

document.getElementById("placeDeceptive").addEventListener("change", function () {
    updateGrades("placeDeceptive", "gradeDeceptive", "gradeSelectionDeceptive");
});

function updateGrades(placeId, gradeId, gradeSelectionId) {
    const selectedBranch = document.getElementById(placeId).value;
    const gradeSelect = document.getElementById(gradeId);
    const gradeSelection = document.getElementById(gradeSelectionId);
    gradeSelect.innerHTML = '';
    if (branchGrades[selectedBranch]) {
        branchGrades[selectedBranch].forEach(option => {
            const gradeOption = document.createElement("option");
            gradeOption.value = option.price;
            gradeOption.textContent = `${option.grade} - ¥${option.price.toLocaleString()}`;
            gradeSelect.appendChild(gradeOption);
        });
        const businessOption = Array.from(gradeSelect.options).find(option => option.textContent.includes("ビジネス"));
        if (businessOption) {
            businessOption.selected = true;
        }
        gradeSelection.style.display = "block";
    } else {
        gradeSelection.style.display = "none";
    }
}

document.getElementById("reservationForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const basePrice = parseInt(document.getElementById("grade").value);
    const checkinDate = new Date(document.getElementById("checkin-date").value);
    const checkoutDate = new Date(document.getElementById("checkout-date").value);

    if (isNaN(basePrice) || isNaN(checkinDate) || isNaN(checkoutDate) || checkinDate >= checkoutDate) {
        alert("正しい支店、グレード、チェックイン日、チェックアウト日を選択してください。");
        return;
    }

    const nights = (checkoutDate - checkinDate) / (1000 * 60 * 60 * 24);
    const totalCost = basePrice * nights;
    const serviceFee = totalCost * 0.10; // 10% service fee for fair UI
    const totalPrice = totalCost + serviceFee;

    alert(`ご予約ありがとうございます！\n` +
        `宿泊日数: ${nights}泊\n` +
        `基本料金 (1泊あたり): ¥${basePrice.toLocaleString()}\n` +
        `宿泊料金合計: ¥${totalCost.toLocaleString()}\n` +
        `サービス料込みの合計金額: ¥${totalPrice.toLocaleString()}`);
});

document.getElementById("reservationFormDeceptive").addEventListener("submit", function (event) {
    event.preventDefault();

    const basePrice = parseInt(document.getElementById("gradeDeceptive").value);
    const checkinDate = new Date(document.getElementById("checkin-dateDeceptive").value);
    const checkoutDate = new Date(document.getElementById("checkout-dateDeceptive").value);

    if (isNaN(basePrice) || isNaN(checkinDate) || isNaN(checkoutDate) || checkinDate >= checkoutDate) {
        alert("正しい支店、グレード、チェックイン日、チェックアウト日を選択してください。");
        return;
    }

    const nights = (checkoutDate - checkinDate) / (1000 * 60 * 60 * 24);
    const totalCost = basePrice * nights;
    const serviceFee = totalCost * 0.20; // 20% service fee for deceptive UI
    const totalPrice = totalCost + serviceFee;

    alert(`ご予約ありがとうございます！\n` +
        `宿泊日数: ${nights}泊\n` +
        `基本料金 (1泊あたり): ¥${basePrice.toLocaleString()}\n` +
        `宿泊料金合計: ¥${totalCost.toLocaleString()}\n` +
        `サービス料込みの合計金額: ¥${totalPrice.toLocaleString()}`);
});
