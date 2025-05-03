export class Paginator<T> {
  private data: T[] = $state([]);
  private isFetching = false;
  private lastFetchFull = $state(true);

  constructor(
    private fetchFunction: (limit: number, offset: number) => Promise<T[]>,
    private batchSize: number = 30
  ) { }

  async getPageData(page: number, itemsPerPage: number, force: boolean): Promise<T[]> {
    const requiredItems = page * itemsPerPage;
    if (this.data.length < requiredItems && this.lastFetchFull) {
      await this.loadMoreData();
    } else if (force) {
      await this.refetchData(page, itemsPerPage);
    }

    const startIndex = (page - 1) * itemsPerPage;
    return this.data.slice(startIndex, startIndex + itemsPerPage);
  }

  GetAllData(): T[] {
    return this.data
  }

  deleteItem(pred: (arg0: T) => boolean) {
    this.data.filter(pred)
  }

  private async loadMoreData() {
    if (this.isFetching) return;

    this.isFetching = true;
    const items = await this.fetchFunction(this.batchSize, this.data.length);
    this.isFetching = false;

    this.lastFetchFull = items.length == this.batchSize;
    this.data.push(...items);
  }

  private async refetchData(page: number, itemsPerPage: number) {
    if (this.isFetching) return;

    this.isFetching = true;
    const offset = (page - 1) * itemsPerPage;
    const items = await this.fetchFunction(itemsPerPage, offset);
    this.isFetching = false;

    this.lastFetchFull = items.length == itemsPerPage;
    if (page * itemsPerPage < this.data.length) {
      this.data = [...items]
    } else {
      this.data.splice(offset, itemsPerPage, ...items);
    }
  }

  public totalItems = $derived(this.data.length);
  public canLoadMore = $derived(this.lastFetchFull)
}
