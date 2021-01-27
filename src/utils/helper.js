export function addressToString(addr) {
  if (!addr || !addr.city) {
    return '';
  }

  return (
    addr.city.join() +
    ' ' +
    (addr.address || '') +
    ' ' +
    (addr.contactName || '') +
    ' ' +
    (addr.tel || '')
  );
}

export function addressCityToString(addr) {
  return addr;
}
