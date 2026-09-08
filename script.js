// Time zone configuration
const timezones = {
    nyc: {
        id: 'America/New_York',
        element: document.getElementById('nyc')
    },
    london: {
        id: 'Europe/London',
        element: document.getElementById('london')
    },
    paris: {
        id: 'Europe/Paris',
        element: document.getElementById('paris')
    },
    dubai: {
        id: 'Asia/Dubai',
        element: document.getElementById('dubai')
    },
    tokyo: {
        id: 'Asia/Tokyo',
        element: document.getElementById('tokyo')
    },
    sydney: {
        id: 'Australia/Sydney',
        element: document.getElementById('sydney')
    },
    la: {
        id: 'America/Los_Angeles',
        element: document.getElementById('la')
    },
    singapore: {
        id: 'Asia/Singapore',
        element: document.getElementById('singapore')
    }
};

/**
 * Format time with leading zeros
 * @param {number} num - Number to format
 * @returns {string} Formatted number
 */
function formatTime(num) {
    return String(num).padStart(2, '0');
}

/**
 * Get current time in specific timezone
 * @param {string} timezone - Timezone identifier
 * @returns {object} Object with hours, minutes, seconds
 */
function getTimeInTimezone(timezone) {
    try {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
            timeZone: timezone
        });
        
        const parts = formatter.formatToParts(now);
        const result = {};
        
        parts.forEach(part => {
            if (part.type !== 'literal') {
                result[part.type] = part.value;
            }
        });
        
        return {
            hours: result.hour || '00',
            minutes: result.minute || '00',
            seconds: result.second || '00'
        };
    } catch (error) {
        console.error(`Error getting time for timezone ${timezone}:`, error);
        return {
            hours: '00',
            minutes: '00',
            seconds: '00'
        };
    }
}

/**
 * Update all clock displays
 */
function updateClocks() {
    Object.values(timezones).forEach(tz => {
        const time = getTimeInTimezone(tz.id);
        const timeString = `${time.hours}:${time.minutes}:${time.seconds}`;
        tz.element.textContent = timeString;
    });
}

/**
 * Initialize the clock system
 */
function initializeClock() {
    // Update immediately
    updateClocks();
    
    // Update every 1000ms (1 second)
    setInterval(updateClocks, 1000);
    
    console.log('Digital clock initialized with multiple time zones');
}

// Start the clock when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeClock);
} else {
    initializeClock();
}
