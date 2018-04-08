package com.kalin.large.core.helpers.image;


import com.kalin.large.core.helpers.exception.ImageProcessingException;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.io.IOUtils;
import org.imgscalr.Scalr;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.awt.image.BufferedImageOp;
import java.io.*;

public class ImageProcessingHelper {
	private static final String DEFAULT_EXTENSION = "jpg";
	private static final String IMAGE_FORMAT_REGEX = "^image";
	
	private ImageProcessingHelper() {};
	
	/**
	 * Calculates the width and height of a supplied image {@link InputStream}
	 * @param image {@link InputStream}
	 * @return the width and Height in form of {@link Dimension} object
	 * @throws IOException
	 * @throws ImageProcessingException 
	 */
	public static Dimension getImageResolution(final InputStream image) throws IOException, ImageProcessingException {
//		if(!isImage(image)) {
//			throw new ImageProcessingException("The supplied stream of data is not an image.");
//		}
		
		BufferedImage bufferedImage = ImageIO.read(clone(image));
		if (bufferedImage == null) {
			throw new ImageProcessingException("Can't transform input ti bufferedImage");
		}
		return new Dimension(bufferedImage.getWidth(), bufferedImage.getHeight());
	}
	
	/**
	 * Calculates the width and height of a supplied image {@link InputStream}
	 * @param image {@link File}
	 * @return the width and Height in form of {@link Dimension} object
	 * @throws IOException
	 * @throws ImageProcessingException 
	 */
	public static Dimension getImageResolution(final File image) throws IOException, ImageProcessingException {
//		if(!isImage(image)) {
//			throw new ImageProcessingException("The supplied stream of data is not an image.");
//		}
		
		BufferedImage bufferedImage = ImageIO.read(new File(image.getAbsolutePath()));
		if (bufferedImage == null) {
			throw new ImageProcessingException("Can't transform input ti bufferedImage");
		}
		return new Dimension(bufferedImage.getWidth(), bufferedImage.getHeight());
	}
	
	/**
	 * Resizes the supplied image {@link File} using the supplied in pixels height and width. Returns the resized image in the same format
	 * @param widthInPx
	 * @param originalImage
	 * @return the resized image {@link File}
	 * @throws ImageProcessingException 
	 */
	public static final File resizeImageToMaxWidth(final int widthInPx, final File originalImage) throws IOException, ImageProcessingException {
		BufferedImage resizedImage = resizeToMaxWidth(widthInPx, originalImage);
		ByteArrayOutputStream os = new ByteArrayOutputStream();
		
		ImageIO.write(resizedImage, FilenameUtils.getExtension(originalImage.getName()), os);
		
		File newImage = new File(originalImage.getAbsolutePath());
		FileUtils.writeByteArrayToFile(newImage, os.toByteArray());
		return newImage;
	}
	
	/**
	 * Resizes the supplied image {@link byte[]} using the supplied in pixels height and width. Returns the resized image in the same format
	 * @param widthInPx int
	 * @param originalImage int
	 * @return the resized image {@link byte[]}
	 */
	public static byte[] resizeImageToMaxWidth(final int widthInPx, final byte[] originalImage) throws IOException, ImageProcessingException {
		return IOUtils.toByteArray(resizeImageToMaxWidth(widthInPx, new ByteArrayInputStream(originalImage)));
	}
	
//	/**
//	 * Checks if the supplied {@link File} is an image
//	 * @param file
//	 * @return true if the file is image type and false if not
//	 * @throws IOException
//	 */
//	public static final boolean isImage(final File file) throws IOException {
//		Tika tika = new Tika();
//		String mimeType = tika.detect(file);
//
//		return MimeTypes.OCTET_STREAM.equals(mimeType) || Pattern.compile(IMAGE_FORMAT_REGEX).matcher(mimeType).find();
//	}
	
//	/**
//	 * Checks if the supplied {@link InputStream} is an image
//	 * @param file
//	 * @return true if the stream is image type and false if not
//	 * @throws IOException
//	 */
//	public static final boolean isImage(final InputStream inputStream) throws IOException {
//		Tika tika = new Tika();
//		String mimeType = tika.detect(clone(inputStream));
//
//		return MimeTypes.OCTET_STREAM.equals(mimeType) || Pattern.compile(IMAGE_FORMAT_REGEX).matcher(mimeType).find();
//	}
//
//	/**
//	 * Checks if the supplied {@link byte[]} is an image
//	 * @param file
//	 * @return true if the data is image type and false if not
//	 * @throws IOException
//	 */
//	public static final boolean isImage(final byte[] data) throws IOException {
//		return isImage(new ByteArrayInputStream(data));
//	}
//
	
	/**
	 * Makes the actual resizing of the supplied {@link BufferedImage}
	 * @param maxWidthInPx {@link Integer}
	 * @param originalImage {@link Integer}
	 * @return the resized image {@link BufferedImage}
	 */
	private static BufferedImage resizeToMaxWidth(final int maxWidthInPx, final InputStream originalImage) throws IOException, ImageProcessingException {
//		if(!isImage(originalImage)) {
//			throw new ImageProcessingException("The supplied stream of data is not an image.");
//		}
		
		return resizeToMaxWidth(maxWidthInPx, ImageIO.read(originalImage));
	}

	/**
	 * Resizes the supplied image {@link InputStream} using the supplied in pixels height and width. Returns the resized image in the same format
	 * @param widthInPx {@link Integer}
	 * @param originalImage widthInPx {@link Integer}
	 * @return the resized image {@link InputStream}
	 */
	private static InputStream resizeImageToMaxWidth(final int widthInPx, final InputStream originalImage) throws IOException, ImageProcessingException {
		BufferedImage resizedImage = resizeToMaxWidth(widthInPx, originalImage);
		ByteArrayOutputStream os = new ByteArrayOutputStream();
		ImageIO.write(resizedImage, DEFAULT_EXTENSION, os);
		return new ByteArrayInputStream(os.toByteArray());
	}
	
	/**
	 * Makes the actual resizing of the supplied {@link BufferedImage}
	 * @param maxWidthInPx {@link Integer}
	 * @param originalImage {@link Integer}
	 * @return the resized image {@link BufferedImage}
	 * @throws ImageProcessingException 
	 * @throws IOException 
	 */
	private static BufferedImage resizeToMaxWidth(final int maxWidthInPx, final File originalImage) throws IOException, ImageProcessingException {
//		if(!isImage(originalImage)) {
//			throw new ImageProcessingException("The supplied stream of data is not an image.");
//		}
		
		return resizeToMaxWidth(maxWidthInPx, ImageIO.read(originalImage));
	}
	
	private static BufferedImage resizeToMaxWidth(final int maxWidthInPx, final BufferedImage bufferedImage) throws IOException, ImageProcessingException {
		Dimension dimension = new Dimension(bufferedImage.getWidth(), bufferedImage.getHeight());
		
		if (dimension.getWidth() <= maxWidthInPx) {
			return bufferedImage;
		}
		
		return Scalr.resize(bufferedImage, Scalr.Method.ULTRA_QUALITY, Scalr.Mode.FIT_TO_WIDTH, maxWidthInPx, (int) dimension.getHeight(), (BufferedImageOp[]) null);
	}
	
	private static InputStream clone(final InputStream inputStream) {
        try {
            inputStream.mark(0);
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            byte[] buffer = new byte[1024];
            int readLength = 0;
            while ((readLength = inputStream.read(buffer)) != -1) {
                outputStream.write(buffer, 0, readLength);
            }
            if (inputStream.markSupported()) {
            	inputStream.reset();
            }
            outputStream.flush();
            return new ByteArrayInputStream(outputStream.toByteArray());
        }
        catch (Exception ex) {
            ex.printStackTrace();
        }
        return null;
    }
}
