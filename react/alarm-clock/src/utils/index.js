import { TIME_CONSTANT } from '../constants';

const GetOptions = ({ title, count = 2, alarm }) => {
  if (title === 'AM/PM') {
    return ['', 'AM', 'PM'].map((value, index) =>
      index === 0 ? (
        <option disabled selected key={index}>
          {TIME_CONSTANT.AMPM}
        </option>
      ) : (
        <option key={index} value={value}>
          {value}
        </option>
      )
    );
  } else {
    return new Array(count + 1).fill(' ').map((_, index) =>
      index === 0 ? (
        <option key={index} disabled selected>
          {title === 'Hour' ? alarm.Hour : alarm.Minute}
        </option>
      ) : (
        <option key={index} value={index}>
          {index}
        </option>
      )
    );
  }
};

const getCurrentTime = (currentTime) => {
  const [hours, ...rest] = currentTime.split(':');
  const newHours = hours < 12 ? hours : hours - 12;
  const timeMode = hours > 12 ? 'PM' : 'AM';

  const newTime = [String(newHours), ...rest];
  return `${newTime.join(':')} ${timeMode}`;
};

export { GetOptions, getCurrentTime };
