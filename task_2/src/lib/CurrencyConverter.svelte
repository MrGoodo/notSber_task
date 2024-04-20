<script lang="ts">
    let amountFrom = 1;
    let amountTo = [];
    let currencyFrom = 'USD';
    let currencyTo = 'EUR';
    let exchangeRate = 1;

    async function loadExchangeRate() {
        try {
            const response = await fetch(`https://v6.exchangerate-api.com/v6/ce82850549e43810e2f1900e/latest/${currencyFrom}`);
            const data = await response.json();
            exchangeRate = data.conversion_rates[currencyTo];
            updateAmountTo();
        } catch (error) {
            console.error('Ошибка при загрузке курса валют:', error);
        }
    }

    function updateAmountTo() {
        amountTo = (amountFrom * exchangeRate).toFixed(2);
    }

    function updateAmountFrom() {
        amountFrom = (amountTo / exchangeRate).toFixed(2);
    }

    loadExchangeRate();

    function handleCurrencyFromChange(event) {
        currencyFrom = event.target.value;
        loadExchangeRate();
    }

    function handleCurrencyToChange(event) {
        currencyTo = event.target.value;
        loadExchangeRate();
    }

    function handleAmountFromChange(event) {
        amountFrom = parseFloat(event.target.value);
        updateAmountTo();
    }

    function handleAmountToChange(event) {
        amountTo = parseFloat(event.target.value);
        updateAmountFrom();
    }
</script>

<body>
    <form class="currency-form">
    
        <h1 class="header">Конвертер валют</h1>
        <label class="currency-label">
            Сумма валюты 1 (<span>{currencyFrom}</span>):
            <input class="currency-input" type="number" bind:value={amountFrom} on:input={handleAmountFromChange}>
        </label>
    
        <label class="currency-label">
            Сумма валюты 2 (<span>{currencyTo}</span>):
            <input class="currency-input" type="number" bind:value={amountTo} on:input={handleAmountToChange}>
        </label>
    
        <select class="currency-select" bind:value={currencyFrom} on:change={handleCurrencyFromChange}>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="RUB">RUB</option>
            <option value="GEL">GEL</option>
        </select>
    
        <select class="currency-select" bind:value={currencyTo} on:change={handleCurrencyToChange}>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="RUB">RUB</option>
            <option value="GEL">GEL</option>
        </select>
    </form>
</body>