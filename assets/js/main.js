document.addEventListener('DOMContentLoaded', () => {
    const themeSwitchers = document.querySelectorAll('input[name="theme"]');
    const display = document.getElementById('display');
    const keys = document.querySelectorAll('.key');
    let lastWasEqual = false;
    let storedNumber = '';
    let currentOperator = '';

    // Función para formatear números
    const formatNumber = (num) => {
        const parts = num.toString().split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        return parts.join(',');
    };

    themeSwitchers.forEach(switcher => {
        switcher.addEventListener('change', (e) => {
            document.body.className = `theme${e.target.id.slice(-1)}`;
        });
    });

    keys.forEach(key => {
        key.addEventListener('click', () => {
            const keyValue = key.textContent;
            let displayValue = display.value.replace(/\./g, '').replace(',', '.'); // Convertir formato visual a número

            if (lastWasEqual && !['DEL', 'RESET', '='].includes(keyValue)) {
                displayValue = '';
                lastWasEqual = false;
            }

            if (keyValue === 'DEL') {
                const newValue = displayValue.slice(0, -1) || '0';
                display.value = formatNumber(newValue);
                lastWasEqual = false;
            } else if (keyValue === 'RESET') {
                display.value = '0';
                storedNumber = '';
                currentOperator = '';
                lastWasEqual = false;
            } else if (keyValue === '=') {
                try {
                    if (storedNumber && currentOperator) {
                        const result = eval(`${storedNumber}${currentOperator}${displayValue}`);
                        display.value = formatNumber(result);
                        storedNumber = '';
                        currentOperator = '';
                    }
                    lastWasEqual = true;
                } catch {
                    display.value = 'Error';
                }
            } else if (['+', '-', '*', '/'].includes(keyValue)) {
                storedNumber = displayValue;
                currentOperator = keyValue;
                display.value = '0';
                lastWasEqual = false;
            } else {
                // Números y punto decimal
                const newValue = displayValue === '0' ? keyValue : displayValue + keyValue;
                display.value = formatNumber(newValue);
                lastWasEqual = false;
            }
        });
    });
});
