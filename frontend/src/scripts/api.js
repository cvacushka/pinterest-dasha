export const deleteCardFromServer = async (url, cardId) => {
    try {
      const response = await fetch(`${url}${cardId}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        throw new Error(`Ошибка при удалении карточки: ${response.statusText}`);
      }
  
      console.log(`Карточка с ID ${cardId} успешно удалена.`);
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  

  // Функция для запроса данных карточек с сервера
export const fetchCardsFromServer = async (url) => {
    try {
      const response = await fetch(url); // Выполняем запрос
      if (!response.ok) { // Проверяем успешность запроса
        throw new Error('Ошибка при загрузке данных');
      }
      const data = await response.json(); // Преобразуем ответ в JSON
      return data; // Возвращаем данные
    } catch (error) {
      console.error('Ошибка:', error);
      return [];
    }
  };


  export const postCardToServer = (url, cardData) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, false); // параметр 'false' делает запрос синхронным
    xhr.setRequestHeader('Content-Type', 'application/json');

    try {
        xhr.send(JSON.stringify(cardData));

        if (xhr.status >= 200 && xhr.status < 300) {
            return JSON.parse(xhr.responseText);
        } else {
            throw new Error('Ошибка при отправке данных');
        }
    } catch (error) {
        console.error('Ошибка:', error);
        return null;
    }
};

