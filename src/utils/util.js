export function toTableQuery(pagination, filters, sorter) {
  console.log('toTableQuery', pagination, sorter, filters);

  pagination = pagination || { current: 1, pageSize: 20 };
  filters = filters || [];
  sorter = sorter || {};

  let query = '';

  // pagination
  query += `page=${pagination.current}&pageSize=${pagination.pageSize}`;

  // filters
  if (filters) {
    let filterQuery = 'filter=';
    filters.forEach((item, index) => {
      filterQuery += `${item.name}~${item.value},`;
    });

    if (query) {
      query += '&';
    }
    query += filterQuery;
  }

  // sorter
  if (sorter.field) {
    if (query) {
      query += '&';
    }
    query += 'sort=' + sorter.field + '~' + sorter.order;
  }

  return query;
}

export function upsert(list, item) {
  if (item.id === undefined || item.id === 0) {
    item.id = -list.length - 1;
    list.push(item);
  } else {
    let index = list.findIndex(i => i.id == item.id);
    list[index] = item;
  }

  return list;
}
