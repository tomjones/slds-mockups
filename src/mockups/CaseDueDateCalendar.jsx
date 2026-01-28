import React, { useState } from 'react';
import Button from '@salesforce/design-system-react/components/button';
import Icon from '@salesforce/design-system-react/components/icon';
import Toast from '@salesforce/design-system-react/components/toast';
import ToastContainer from '@salesforce/design-system-react/components/toast/container';

const CaseDueDateCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Mock case data
  const caseRecord = {
    currentDueDate: new Date(2025, 11, 20), // Dec 20, 2025
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const formatDate = (date) => {
    if (!date) return 'Not Set';
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatShortDate = (date) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const isSameDay = (date1, date2) => {
    if (!date1 || !date2) return false;
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const handleDateClick = (date) => {
    if (date < today) return; // Don't allow past dates

    setSelectedDate(date);
    setToastMessage(`Due Date updated to ${formatDate(date)}`);
    setShowToast(true);

    // Auto-hide toast after 3 seconds
    setTimeout(() => setShowToast(false), 3000);
  };

  const navigateMonth = (direction) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  const goToToday = () => {
    setCurrentMonth(new Date());
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const getDateCellStyle = (date) => {
    if (!date) return {};

    const isToday = isSameDay(date, today);
    const isSelected = isSameDay(date, selectedDate);
    const isCurrentDueDate = isSameDay(date, caseRecord.currentDueDate);
    const isPast = date < today;

    let style = {
      width: '40px',
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50%',
      cursor: isPast ? 'not-allowed' : 'pointer',
      fontSize: '14px',
      fontWeight: isToday ? '700' : '400',
      transition: 'all 0.15s ease',
      position: 'relative',
    };

    if (isPast) {
      style.color = '#c9c9c9';
    } else if (isSelected) {
      style.backgroundColor = '#0176d3';
      style.color = '#ffffff';
    } else if (isCurrentDueDate && !selectedDate) {
      style.backgroundColor = '#fe9339';
      style.color = '#ffffff';
    } else if (isToday) {
      style.border = '2px solid #0176d3';
      style.color = '#0176d3';
    } else {
      style.color = '#181818';
    }

    return style;
  };

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const days = getDaysInMonth(currentMonth);

  // Component Card wrapper
  const ComponentCard = ({ title, children, icon, actions }) => (
    <div style={{
      backgroundColor: 'white',
      border: '2px solid #0176d3',
      borderRadius: '4px',
      padding: '20px',
      marginBottom: '24px',
      position: 'relative'
    }}>
      <div style={{
        position: 'absolute',
        top: '-12px',
        left: '16px',
        backgroundColor: '#0176d3',
        color: 'white',
        padding: '4px 12px',
        borderRadius: '4px',
        fontSize: '11px',
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
      }}>
        Component
      </div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {icon && <Icon category="utility" name={icon} size="small" />}
          <h3 className="slds-text-heading_small" style={{ margin: 0 }}>{title}</h3>
        </div>
        {actions && <div>{actions}</div>}
      </div>
      {children}
    </div>
  );

  return (
    <div style={{ padding: '24px', backgroundColor: '#f3f3f3', minHeight: '100vh' }}>
      {showToast && (
        <ToastContainer style={{ top: '60px' }}>
          <Toast
            labels={{
              heading: 'Success',
              details: toastMessage,
            }}
            variant="success"
            onRequestClose={() => setShowToast(false)}
          />
        </ToastContainer>
      )}

      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <ComponentCard
          title="Case Due Date Selector"
          icon="date_time"
          actions={
            <Button
              label="Today"
              variant="neutral"
              onClick={goToToday}
            />
          }
        >
          {/* Instructions */}
          <div style={{
            padding: '8px 12px',
            backgroundColor: '#f3f3f3',
            borderRadius: '4px',
            fontSize: '13px',
            color: '#706e6b',
            marginBottom: '16px'
          }}>
            Click any date to instantly update the Due Date for this case.
          </div>

          {/* Calendar Navigation */}
          <div className="slds-grid slds-grid_align-spread slds-grid_vertical-align-center slds-m-bottom_medium">
            <Button
              assistiveText={{ icon: 'Previous Month' }}
              iconCategory="utility"
              iconName="chevronleft"
              iconSize="medium"
              variant="icon"
              onClick={() => navigateMonth(-1)}
            />
            <h2 className="slds-text-heading_medium" style={{ fontWeight: '700' }}>
              {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h2>
            <Button
              assistiveText={{ icon: 'Next Month' }}
              iconCategory="utility"
              iconName="chevronright"
              iconSize="medium"
              variant="icon"
              onClick={() => navigateMonth(1)}
            />
          </div>

          {/* Calendar Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: '4px',
            maxWidth: '400px',
            margin: '0 auto 24px auto'
          }}>
            {/* Weekday Headers */}
            {weekDays.map((day) => (
              <div
                key={day}
                style={{
                  textAlign: 'center',
                  padding: '8px',
                  fontWeight: '700',
                  color: '#706e6b',
                  fontSize: '12px',
                }}
              >
                {day}
              </div>
            ))}

            {/* Day Cells */}
            {days.map((date, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '4px',
                }}
              >
                {date && (
                  <div
                    style={getDateCellStyle(date)}
                    onClick={() => handleDateClick(date)}
                    onMouseEnter={(e) => {
                      if (date >= today && !isSameDay(date, selectedDate)) {
                        e.currentTarget.style.backgroundColor = '#f3f3f3';
                      }
                    }}
                    onMouseLeave={(e) => {
                      const style = getDateCellStyle(date);
                      e.currentTarget.style.backgroundColor = style.backgroundColor || 'transparent';
                    }}
                    title={formatDate(date)}
                  >
                    {date.getDate()}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="slds-grid slds-grid_align-center" style={{ gap: '24px', marginBottom: '24px' }}>
            <div className="slds-grid slds-grid_vertical-align-center">
              <div style={{
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                border: '2px solid #0176d3',
                marginRight: '8px'
              }} />
              <span className="slds-text-body_small">Today</span>
            </div>
            <div className="slds-grid slds-grid_vertical-align-center">
              <div style={{
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                backgroundColor: '#fe9339',
                marginRight: '8px'
              }} />
              <span className="slds-text-body_small">Current Due Date</span>
            </div>
            <div className="slds-grid slds-grid_vertical-align-center">
              <div style={{
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                backgroundColor: '#0176d3',
                marginRight: '8px'
              }} />
              <span className="slds-text-body_small">Selected Date</span>
            </div>
          </div>

          {/* Quick Select Section */}
          <div style={{
            borderTop: '1px solid #dddbda',
            paddingTop: '16px'
          }}>
            <h4 className="slds-text-heading_small" style={{ marginBottom: '12px' }}>
              Quick Select
            </h4>
            <div className="slds-grid slds-wrap slds-gutters_x-small">
              {[
                { label: 'Tomorrow', days: 1 },
                { label: 'In 3 Days', days: 3 },
                { label: 'In 1 Week', days: 7 },
                { label: 'In 2 Weeks', days: 14 },
                { label: 'In 1 Month', days: 30 },
                { label: 'End of Month', special: 'endOfMonth' },
              ].map((option) => {
                let targetDate;
                if (option.special === 'endOfMonth') {
                  targetDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
                } else {
                  targetDate = new Date(today);
                  targetDate.setDate(today.getDate() + option.days);
                }

                const isSelected = isSameDay(targetDate, selectedDate);

                return (
                  <div key={option.label} className="slds-col slds-size_1-of-3 slds-m-bottom_x-small">
                    <Button
                      label={`${option.label} (${formatShortDate(targetDate)})`}
                      variant={isSelected ? 'brand' : 'neutral'}
                      onClick={() => handleDateClick(targetDate)}
                      style={{ width: '100%' }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </ComponentCard>
      </div>
    </div>
  );
};

export default CaseDueDateCalendar;
