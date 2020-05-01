For file uploading, adding drag & drop functionality to accomplish a modern and efficient design is a great feature to add to any application. This article outlines how this can be done with WPF and an Azure Storage Account.

#### Context
 
    **Azure Storage Type:** Blob (eliminates the need to generate access tokens, which is required when using File Shares)
    **This Example's Software Architecture:** Code-Behind (easy to implement for an example)

#### Setup
- Setup an Azure (or similar) Storage Account (Azure Storage Account setup process here)
- To use the Azure storage class libraries, you will need to add the WindowsAzure.Storage NuGet package to the project


**Example drag/drop xaml:**

```
<Grid>
    <Grid.RowDefinitions>
        <RowDefinition/>
        <RowDefinition/>
    </Grid.RowDefinitions>
    <ListBox x:Name="listBx" Grid.Row="0" BorderBrush="Black" BorderThickness="1" Margin="5">
        <ListBox.ItemTemplate>
            <DataTemplate>
                <Grid>
                    <TextBlock>
                        <Hyperlink NavigateUri="{Binding}" Click="Hyperlink_Click">
                            <TextBlock Text="{Binding}"/>
                        </Hyperlink>
                    </TextBlock>
                </Grid>
            </DataTemplate>
        </ListBox.ItemTemplate>
    </ListBox>
    <Grid Grid.Row="1" AllowDrop="True" DragDrop.Drop="Grid_Drop" Background="WhiteSmoke"/>
    <TextBlock Grid.Row="1" VerticalAlignment="Center" HorizontalAlignment="Center" Text="Drag and drop file here" Foreground="DimGray"/>
</Grid>
```

**Key notes about this code:**
    - Set the following attributes on the Grid:
      - AllowDrop="True" 
      - DragDrop.Drop="*DropMethod*" 
      - Background="*Color*"  - (important to set the background, otherwise the element will not participate in hit testing and the drop event will not fire)

**Example code-behind code:**
```
using System;
using System.IO;
using System.Threading.Tasks;
using System.Windows;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;

namespace WpfApp1
{
	public partial class MainWindow : Window
	{
		private readonly CloudBlobContainer _blobContainer;

		public MainWindow()
		{
			InitializeComponent();

			var storageAcct = CloudStorageAccount.Parse("<storage acct conn string>");
			var blobClient = storageAcct.CreateCloudBlobClient();
			_blobContainer = blobClient.GetContainerReference("<storage container>");
		}

		private void Hyperlink_Click(object sender, RoutedEventArgs e)
		{

		}

		private async void Grid_Drop(object sender, DragEventArgs e)
		{
			if (e.Data.GetDataPresent(DataFormats.FileDrop))
			{
				var files = e.Data.GetData(DataFormats.FileDrop) as string[];

				foreach (var file in files)
				{
					var isUploadSuccessful = await UploadToBlobStorage(file);

					if (isUploadSuccessful)
					{
						GetBlobs();
					}
				}
			}
		}

		private async Task<bool> UploadToBlobStorage(string localAbsoluteFilePath)
		{
			var fileName = Path.GetFileName(localAbsoluteFilePath);
			var blockBlob = _blobContainer.GetBlockBlobReference(fileName);
			blockBlob.Properties.ContentType = "image/jpeg"; // Assume we are only uploading images

			try
			{
				using var fileStream = File.OpenRead(localAbsoluteFilePath);
				await blockBlob.UploadFromStreamAsync(fileStream);
				return true;
			}
			catch (Exception)
			{
				// Log
				return false;
			}
		}

		private async void GetBlobs()
		{
			BlobContinuationToken continuationToken = null;

			try
			{
				do
				{
					var resultSegment = await _blobContainer.ListBlobsSegmentedAsync(
						string.Empty,
						true,
						BlobListingDetails.Metadata,
						null,
						continuationToken,
						null,
						null);

					foreach (var item in resultSegment.Results)
					{
						var blob = item as CloudBlob;

						if (!listBx.Items.Contains(blob.Uri))
						{
							listBx.Items.Add(blob.Uri);
						}
					}

					continuationToken = resultSegment.ContinuationToken;

				} while (continuationToken != null);
			}
			catch (StorageException)
			{
				throw;
			}
		}
	}
}
```

This example also sets the ContentType of the Blob so that the content can be opened by link (instead of just downloaded)