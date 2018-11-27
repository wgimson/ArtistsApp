import { ArtistsappPage } from './app.po';

describe('artistsapp App', () => {
  let page: ArtistsappPage;

  beforeEach(() => {
    page = new ArtistsappPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
