import { withId } from '@/lib/mappers';

export const getCardList = async (): Promise<UI.Card[]> => {
  try {
    const result = await fetch('/api/card-item');
    const { data }: API.Response<API.Card[]> = await result.json();
    return data.map(withId<API.Card, UI.Card>);
  } catch (error) {
    return [];
  }
};

export const getCardDetails = async (
  id: string,
): Promise<UI.Card | undefined> => {
  try {
    const result = await fetch(`/api/card-item/${id}`);
    const { data }: API.Response<API.Card> = await result.json();
    return withId<API.Card, UI.Card>(data);
  } catch (error) {
    return undefined;
  }
};

export const updateCardItem = async ({
  id,
  rating,
  comments,
}: API.UpdateCardItemPayload): Promise<UI.Card | undefined> => {
  try {
    const result = await fetch(`/api/card-item/${id}/rate`, {
      body: JSON.stringify({ rating, comments }),
      method: 'PUT',
    });
    const { data }: API.Response<API.Card> = await result.json();
    return withId<API.Card, UI.Card>(data);
  } catch (error) {
    return undefined;
  }
};

export const createCardItem = async (
  payload: API.CreateCardItemPayload,
): Promise<UI.Card | undefined> => {
  try {
    const formData = new FormData();
    formData.append('title', payload.title);
    formData.append('description', payload.description);
    formData.append('image', payload.image);

    const result = await fetch('/api/card-item', {
      method: 'POST',
      body: formData,
    });

    const { data }: API.Response<API.Card> = await result.json();
    return withId<API.Card, UI.Card>(data);
  } catch (error) {
    console.error('Error:', error);
    return undefined;
  }
};
