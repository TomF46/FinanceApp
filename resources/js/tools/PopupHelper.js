import { confirmAlert } from 'react-confirm-alert';

export function confirm(
  $title,
  $message,
  $acceptFunction,
  $declineFunction = null,
) {
  confirmAlert({
    title: $title,
    message: $message,
    buttons: [
      {
        label: 'Yes',
        onClick: () => $acceptFunction(),
      },
      {
        label: 'No',
        onClick: () => {
          $declineFunction ? $declineFunction() : {};
        },
      },
    ],
  });
}
