import { AlertCircle, CheckCircle, XCircle } from 'lucide-react-native';
import { cssInterop } from 'nativewind';

function interopIcon(icon) {
  cssInterop(icon, {
    className: {
      target: 'style',
      nativeStyleToProp: {
        color: true,
        opacity: true,
      },
    },
  });
}

interopIcon(AlertCircle);
interopIcon(CheckCircle);
interopIcon(XCircle);

export { AlertCircle, CheckCircle, XCircle };